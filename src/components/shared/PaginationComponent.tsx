import React, { useEffect, useState } from "react";

export const PaginationComponent = (props: any) => {
  const [page, setPage] = useState(props.currentPage);
  
  const totalPages = ():number =>{
    return Math.ceil(totalGridRecords() / 10)
  }

  const currentPageCalculator = (): number => {
    if (totalPages() === 0) return 0;

    if (props.currentPage == 0) return 1;

    return props.currentPage / 10 + 1;
  };

  const nextPage = () => {
    if (
      props.dataSource.filter((obj: any) =>
        obj[props.filterValueName].includes(props.search)
      ).length >
      props.currentPage + 10
    )
      props.setCurrentPage(props.currentPage + 10);
  };

  const prevPage = () => {
    if (props.currentPage > 0) props.setCurrentPage(props.currentPage - 10);
  };

  const totalGridRecords = (): number => {
    if (props.search.length === 0) return props.dataSource.length;

    return props.dataSource.filter((obj:any) => obj[props.filterValueName].toLowerCase().includes(props.search))
      .length;
  };

  useEffect(() => {
    setPage(currentPageCalculator);
  }, [props.currentPage, totalPages]);

  return (
    <>
      <div className="text-center shadow p-1 bg-white rounded">
        <div className="d-inline p-2">
          <span className="me-md-2 cursor body">
            <i
              title="Previuos Page"
              className="bi bi-arrow-left-circle-fill"
              style={{ fontSize: 28 }}
              onClick={prevPage}
            ></i>
          </span>
        </div>

        <div className="d-inline body" style={{ fontSize: 20 }}>
          {page} of {totalPages()}
        </div>

        <div className="d-inline p-2 ms-1 ">
          <span className="me-md-2 cursor body">
            <i
              title="Next Page"
              className="bi bi-arrow-right-circle-fill"
              style={{ fontSize: 28 }}
              onClick={nextPage}
            ></i>
          </span>
        </div>
      </div>
    </>
  );
};
