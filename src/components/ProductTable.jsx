import React from "react";
import styled from "styled-components";
import { useTable, useSortBy, usePagination } from "react-table";
import "./ProductTable.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export default function ProductTable({ products }) {
  const data = React.useMemo(() => [...products], [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        columns: [
          {
            Header: "Title",
            accessor: "title",
          },
          {
            Header: "Company",
            accessor: "company",
          },
          {
            Header: "Price",
            accessor: "price",
          },
        ],
      },
      {
        Header: "Status",
        columns: [
          {
            Header: "Department",
            accessor: "department",
          },

          {
            Header: "inCart",
            accessor: "inCart",
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  // const firstPageRows = page.slice(0, 20);

  return (
    <Styles>
      <>
        {/* <pre>
          <code>
            {JSON.stringify(
              { pageIndex, pageSize, pageCount, canNextPage, canPreviousPage },
              null,
              2
            )}
          </code>
        </pre> */}
        <table {...getTableProps()} className="mx-auto">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                className="tHeaderGroups"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting.
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination mx-auto">
          <div className="mx-auto">
            <button
              className=""
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="ml-2"
              onClick={() => previousPage(0)}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className="ml-2"
              onClick={() => nextPage(0)}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="ml-2"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span className="ml-5">
              Page{" "}
              <strong className="ml-2">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>{" "}
            <select
              className="ml-5"
              calue={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    </Styles>
  );
}
