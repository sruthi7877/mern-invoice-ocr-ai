import React from "react";

function InvoiceForm({ data, onChange, setSummary }) {
  const handleConfirm = () => {
    setSummary(`
      Invoice Number: ${data.invoiceNumber}
      Date: ${data.date}
      Customer Name: ${data.customerName}
      Total Amount: ${data.totalAmount}
    `);
  };

  return (
    <div>
      <h2>Invoice Form</h2>
      <input
        type="text"
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={data.invoiceNumber ||""}
        onChange={onChange}
      />
      <input
        type="text"
        name="date"
        placeholder="dd-mm-yyyy"
        value={data.date || ""}
        onChange={onChange}
      />
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={data.customerName || ""}
        onChange={onChange}
      />
      <input
        type="text"
        name="totalAmount"
        placeholder="Total Amount"
        value={data.totalAmount || ""}
        onChange={onChange}
      />

      <button onClick={handleConfirm}>Confirm & Get Summary</button>
    </div>
  );
}

export default InvoiceForm;
