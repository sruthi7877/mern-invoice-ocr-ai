import React from "react";

function Summary({ summary }) {
  console.log(summary)
  return (
    <div className="summary">
      <h2>Invoice Summary</h2>
      <pre>{summary}</pre>
    </div>
  );
}

export default Summary;
