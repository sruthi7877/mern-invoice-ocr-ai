// src/models/Invoice.js
import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, index: true },
  date: { type: String }, // keep simple for now to avoid timezone issues
  customerName: { type: String },
  totalAmount: { type: Number },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['draft', 'confirmed'], default: 'draft' },
  summary: { type: String },
  ocrProvider: { type: String, default: 'ocrspace' },
  ocrRaw: { type: Object },
  fileMeta: {
    filename: String,
    mimetype: String,
    size: Number
  }
}, { timestamps: true });

export default mongoose.model('Invoice', InvoiceSchema);
