import React from "react";

export const ErrorsBasedOnValidation = ({errorsList}: any) => {
  console.log("errorsList",errorsList)
  return (
    <>
      <ul>
        {errorsList.map((data:any) => (
          <li key={data}>
            <p className="text-danger">{data}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
