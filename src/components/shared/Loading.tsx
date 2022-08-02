import React from "react";

export const Loading = () => {
  return (
    <div className="row">
      <div className="col-md-12">
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    </div>
  );
};
