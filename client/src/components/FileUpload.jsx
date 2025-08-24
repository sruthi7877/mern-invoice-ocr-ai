import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setInvoiceData }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const res = await axios.post(
        `${apiUrl}/api/invoices/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setInvoiceData(res.data); // store extracted invoice data
      setMessage("File uploaded & draft created!");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file!");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default FileUpload;
