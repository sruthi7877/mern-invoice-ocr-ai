import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import invoiceRoutes from './routes/invoices.js';

const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',');

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed by backend'));
    }
  }
}));
app.use(express.json({ limit: '2mb' }));

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/invoices', invoiceRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

const port = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server on :${port}`));
});