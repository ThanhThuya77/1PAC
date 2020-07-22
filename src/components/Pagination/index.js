import * as React from "react";
import "./style.css";

const Pagination = (props) => {

  var pager = props.pager || {};
  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <ul className="pagination">
      <li className={pager.currentPage === 1 ? "disabled" : ""}>
        <span onClick={() => props.setPage(1)}>{"<<"}</span>
      </li>
      <li className={pager.currentPage === 1 ? "disabled" : ""}>
        <span onClick={() => props.setPage(pager.currentPage - 1)}>{"<"}</span>
      </li>
      {pager.pages.map((page, index) => (
        <li key={index} className={pager.currentPage === page ? "active" : ""}>
          <span onClick={() => props.setPage(page)}>{page}</span>
        </li>
      ))}
      <li className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
        <span onClick={() => props.setPage(pager.currentPage + 1)}>{">"}</span>
      </li>
      <li className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
        <span onClick={() => props.setPage(pager.totalPages)}>{">>"}</span>
      </li>
    </ul>
  );
};

export default Pagination;
