import { v4 as uuidv4 } from 'uuid';

let invoices = [];

export const uploadAndExtract = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Simulated invoice extraction (replace with AI/ML later)
    const extractedData = {
      id: uuidv4(),
      invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000),
      date: new Date().toISOString().split('T')[0],
      customerName: 'John Doe',
      totalAmount: (Math.random() * 1000).toFixed(2),
      rawFile: req.file.originalname,
      status: 'draft'
    };

    invoices.push(extractedData);

    res.status(201).json({
      message: 'Invoice uploaded & extracted successfully',
      invoice: extractedData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload & extract invoice' });
  }
};


export const updateAndConfirm = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceNumber, date, customerName, totalAmount } = req.body;

    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Update fields
    if (invoiceNumber) invoice.invoiceNumber = invoiceNumber;
    if (date) invoice.date = date;
    if (customerName) invoice.customerName = customerName;
    if (totalAmount) invoice.totalAmount = totalAmount;

    invoice.status = 'confirmed';

    res.json({
      message: 'Invoice updated & confirmed successfully',
      invoice
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update invoice' });
  }
};


export const summarize = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Simple summary (replace with AI later)
    const summary = `
      Invoice ${invoice.invoiceNumber} for ${invoice.customerName}
      dated ${invoice.date}, with a total amount of $${invoice.totalAmount}.
    `;

    res.json({
      message: 'Invoice summary generated successfully',
      summary: summary.trim()
    });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ message: 'Failed to summarize invoice' });
  }
};
