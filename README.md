# 📄 Invoice AI Extractor  

A full-stack MERN application that extracts invoice details using AI, allows users to confirm/update data, and generates a structured summary.  

---

## 🚀 Features
- Upload invoices in **PDF, JPG, PNG** formats.  
- AI-powered invoice detail extraction (Invoice Number, Date, Customer Name, Total Amount).  
- User confirmation and editing before finalizing.  
- Generates a clean **invoice summary**.  
- Error handling for unsupported files and missing data.  
- Styled UI with React + TailwindCSS for modern look.  

---

## 🛠️ Tech Stack
### Backend
- **Node.js + Express.js** – API and routes  
- **Multer** – File upload handling  
- **MongoDB + Mongoose** – Data storage  
- **Custom AI Mock Extractor** – Simulated AI data extraction  

### Frontend
- **React.js** – UI framework  
- **Tailwind CSS** – Styling  
- **Axios** – API communication  

---

## 📂 Project Structure
project/
│── server/
|__ src
│ |── controllers/
│ │ └── invoice.controller.js
│ ├── routes/
│ │ └── invoices.js
│ ├── models/
│ │ └── Invoice.js
│ ├── utils/
│ │ └── asyncHandler.js
│ ├── server.js
│ └── config/db.js
│
│── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── components/
| | | └──FileUpload.jsx
| | | └── Summary.jsx
│ │ │ └── InvoiceSummary.jsx
│ │ └── App.jsx
| | └──main.jsx
│ ├── public/
│ └── package.json