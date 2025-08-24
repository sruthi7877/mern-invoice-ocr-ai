import axios from 'axios';

export async function cohereSummarizeOneLiner({ invoiceNumber, date, customerName, totalAmount, currency }) {
  const apiKey = process.env.COHERE_API_KEY;
  const model = process.env.COHERE_MODEL || 'command-r-plus-08-2024';
  const prompt = `Write exactly one concise sentence summarizing an invoice.
If any field is missing, infer neutral phrasing without making up numbers.
Format: "Invoice <NUMBER> dated <DATE> for <CUSTOMER> totals <CUR_SYMBOL><AMOUNT>."
Symbols by currency: INR=₹, USD=$, EUR=€, GBP=£.

Fields:
- Number: ${invoiceNumber || 'N/A'}
- Date: ${date || 'N/A'}
- Customer: ${customerName || 'N/A'}
- Total: ${typeof totalAmount === 'number' ? totalAmount : 'N/A'}
- Currency: ${currency || 'INR'}
`;

  const { data } = await axios.post(
    'https://api.cohere.ai/v1/generate',
    {
      model,
      prompt,
      max_tokens: 60,
      temperature: 0.2
    },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  const text = data?.generations?.[0]?.text?.trim() || '';
  return text.replace(/^"|"$/g, '');
}