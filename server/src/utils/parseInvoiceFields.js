// Simple, robust regex-based parsing from raw text
export function parseInvoiceFieldsFromText(text = '') {
  const clean = text.replace(/\r/g, '').trim();

  // Invoice number (common patterns: INV-123, Invoice No: 12345)
  const invMatch = clean.match(/(?:Invoice\s*(?:No\.?|#|Number)\s*[:\-]?\s*|INV[-\s]?)([A-Z0-9\-\/]+)/i);
  const invoiceNumber = invMatch ? invMatch[1].trim() : '';

  // Date (dd/mm/yyyy, dd-mm-yyyy, 10 Aug 2025, 2025-08-10)
  const dateMatch = clean.match(/(\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}\b)/);
  const date = dateMatch ? dateMatch[1] : '';

  // Customer name (after Bill To / Sold To / Customer)
  const custMatch = clean.match(/(?:Bill\s*To|Billed\s*To|Sold\s*To|Customer)\s*[:\-]?\s*([A-Za-z][A-Za-z\s\.&,'-]{2,})/i);
  const customerName = custMatch ? custMatch[1].trim() : '';

  // Total amount (look for Grand Total/Total/Amount Due)
  const amountMatch = clean.match(/(?:Grand\s*Total|Total\s*Amount|Amount\s*Due|Total)\s*[:\-]?\s*([₹$€£]?)\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/i);
  let currency = 'INR';
  if (amountMatch && amountMatch[1]) {
    const sym = amountMatch[1];
    currency = sym === '₹' ? 'INR' : sym === '$' ? 'USD' : sym === '€' ? 'EUR' : sym === '£' ? 'GBP' : 'INR';
  }
  const totalAmount = amountMatch ? Number(String(amountMatch[2]).replace(/,/g, '')) : undefined;

  return { invoiceNumber, date, customerName, totalAmount, currency };
}

// For Mindee, prefer their structured fields if present
export function mapMindeeInvoice(json) {
  try {
    const doc = json?.document?.inference?.prediction;
    if (!doc) return null;
    return {
      invoiceNumber: doc.invoice_number?.values?.[0]?.content || doc.invoice_number?.content || '',
      date: doc.date?.content || doc.date?.values?.[0]?.content || '',
      customerName: doc.supplier?.name || doc.customer_name?.content || '',
      totalAmount: Number(doc.total_amount?.value ?? doc.total_amount?.content ?? 0) || undefined,
      currency: doc.currency?.value || 'INR'
    };
  } catch {
    return null;
  }
}