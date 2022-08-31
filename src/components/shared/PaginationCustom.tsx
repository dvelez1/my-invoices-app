import React, { useEffect, useState } from "react";

export const PaginationCustom = (props: any) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(props.totalPages === 0 ? 0 : (props.currentPage / 10) + 1);
  }, [props.currentPage]);

  return (
    <>
      <div className="text-center shadow p-1 bg-white rounded">
        
        <div className="d-inline p-2">
          <span className="me-md-2 cursor body">
            <i
              title="Previuos Page"
              className="bi bi-arrow-left-circle-fill"
              style={{ fontSize: 28 }}
              onClick={props.prevPage}
            ></i>
          </span>
        </div>

        <div className="d-inline body" style={{ fontSize: 20 }}>
          {currentPage} of {props.totalPages}
        </div>

        <div className="d-inline p-2 ms-1 ">
          <span className="me-md-2 cursor body">
            <i
              title="Next Page"
              className="bi bi-arrow-right-circle-fill"
              style={{ fontSize: 28 }}
              onClick={props.nextPage}
            ></i>
          </span>
        </div>

      </div>
    </>
  );
};
