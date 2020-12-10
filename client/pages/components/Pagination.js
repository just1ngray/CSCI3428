/**
 * Paginates a dataset to as many pages as needed.
 * @author Justin Gray - all of it
 */
import React from "react";

/**
 * Paginates a dataset to as many pages as needed.
 * @props numItems      the number of items in the dataset
 * @props itemsPerPage  the number of items that can be on a single page
 * @props currentPage   the current page (1 indexed)
 * @props setPage       set the new page to view
 */
export default function Pagination({
  numItems,
  itemsPerPage,
  currentPage,
  setPage,
}) {
  const pages = [];
  [...new Array(Math.ceil(numItems / itemsPerPage)).keys()].forEach(
    (pageNum) => {
      pages.push(
        <button
          key={pageNum + 1}
          type="button"
          onClick={() => setPage(pageNum + 1)}
          className={`button ${currentPage === pageNum + 1 ? "is-info" : ""}`}
        >
          {pageNum + 1}
        </button>
      );
    }
  );

  return <div className="buttons has-addons">{pages}</div>;
}
