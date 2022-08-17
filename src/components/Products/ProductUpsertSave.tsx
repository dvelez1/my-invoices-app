import React, { useState } from "react";

export const ProductUpsertSave = (props: any) => {

  return (
    <>
      <div className="card-footer text-muted mt-4">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {!props.isPending && (
            <button className="btn btn-primary me-md-2" type="submit">
              Save
            </button>
          )}
          {props.isSubmit && (
            <button className="btn btn-primary me-md-2" disabled type="submit">
              Saving
            </button>
          )}
          <button
            className="btn btn-primary"
            type="button"
            onClick={props.handleUpsertClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
