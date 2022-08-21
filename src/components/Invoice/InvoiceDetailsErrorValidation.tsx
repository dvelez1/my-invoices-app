import React from "react";

export const InvoiceDetailsErrorValidation = (errors: []) => {
  return (
    <>
      <ul>
        {errors.map((data) => (
          <li key={data}>
            <p className="text-danger">{data}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
