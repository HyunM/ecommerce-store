import React from "react";
import styled from "styled-components";
import { useTable, useSortBy, usePagination } from "react-table";
import "./ProductTable.css";
import "./styled/Button";
import "./Modal";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { Select } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

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

function toCurrency(numberString) {
  let number = parseFloat(numberString);
  return number.toLocaleString("USD");
}

export default function ProductTable({
  products,
  addToCart,
  openModal,
  closeModal,
}) {
  const data = React.useMemo(() => [...products], [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        columns: [
          {
            Header: "Title",
            accessor: "title",
            Cell: ({ value }) => (
              <div className="t-blue f-weight-700">{value}</div>
            ),
          },
          {
            Header: "Company",
            accessor: "company",
            Cell: ({ value }) => <div className="f-weight-500">{value}</div>,
          },
          {
            Header: "Price",
            accessor: "price",
            Cell: ({ value }) => (
              <div className="t-lblue text-right">$ {toCurrency(value)}</div>
            ),
          },
        ],
      },
      {
        Header: "Status",
        columns: [
          {
            Header: "Department",
            accessor: "department",
            Cell: ({ value }) => (
              <div className="t-info f-weight-500">{value}</div>
            ),
          },
          {
            Header: "Stock",
            accessor: "inStock",
            Cell: ({ value }) => (
              <div className="t-grey text-right">{value}</div>
            ),
          },
          {
            Header: "Min. Stock",
            accessor: "minStock",
            Cell: ({ value }) => (
              <div className="t-grey text-right">{value}</div>
            ),
          },
          {
            Header: "Status",
            accessor: data => data.minStock - data.inStock,
            sortType: "basic",
            Cell: ({ value }) =>
              value >= 0 ? (
                <div className="t-green text-right">{"+" + value}</div>
              ) : (
                <div className="t-red f-weight-500 text-right">{value}</div>
              ),
          },
          {
            Header: "inCart",
            accessor: "inCart",
            Cell: row => (
              <div className="text-center">
                <button
                  className="cart-btn"
                  disabled={row.row.original.inCart ? true : false}
                  onClick={() => {
                    addToCart(row.row.original.id);
                    openModal(row.row.original.id);
                  }}
                >
                  {row.row.original.inCart ? (
                    <p className="text-capitalize mb-0" disabled>
                      in cart
                    </p>
                  ) : (
                    <i className="fas fa-cart-plus" />
                  )}
                </button>
              </div>
            ),
          },
        ],
      },
    ],
    [addToCart, openModal]
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

        <div className="pagination mx-auto table-footer">
          <div className="mx-auto">
            <SkipPreviousIcon
              className="cp cpIcon"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              color="primary"
              fontSize="large"
            ></SkipPreviousIcon>{" "}
            <ArrowLeftIcon
              className="ml-2 cp cpIcon"
              onClick={() => previousPage(0)}
              disabled={!canPreviousPage}
              color="primary"
              fontSize="large"
            ></ArrowLeftIcon>{" "}
            <ArrowRightIcon
              className="ml-2 cp cpIcon"
              onClick={() => nextPage(0)}
              disabled={!canNextPage}
              color="primary"
              fontSize="large"
            ></ArrowRightIcon>{" "}
            <SkipNextIcon
              className="ml-2 cp cpIcon"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              color="primary"
              fontSize="large"
            ></SkipNextIcon>{" "}
            <span className="ml-5">
              Page{" "}
              <strong className="ml-2">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>{" "}
            <Select
              className="ml-5"
              value={pageSize}
              displayEmpty
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <MenuItem key={pageSize} value={pageSize}>
                  Show {pageSize}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </>
    </Styles>
  );
}
