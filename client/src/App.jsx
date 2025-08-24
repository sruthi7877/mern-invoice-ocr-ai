import React, { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import InvoiceForm from "./components/InvoiceForm.jsx";
import Summary from "./components/Summary.jsx";

function App() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: "",
    customerName: "",
    totalAmount: "",
  });
  const [summary, setSummary] = useState("");

  // Handle input changes in InvoiceForm
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app">
      <h1>Invoice AI Extractor</h1>

      {!invoiceData?.invoiceNumber && !summary && (
        <FileUpload setInvoiceData={setInvoiceData} />
      )}

      {invoiceData && !summary && (
        <InvoiceForm
          data={invoiceData}
          onChange={handleChange}   
          setSummary={setSummary}
        />
      )}

      {summary && <Summary summary={summary} />}
    </div>
  );
}

export default App;
