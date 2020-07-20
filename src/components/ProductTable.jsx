import React from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import "./ProductTable.css";
import "./styled/Button";
import "./Modal";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import matchSorter from "match-sorter";
import Input from "@material-ui/core/Input";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExportProducts from "./ExportProducts";

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
  let number = parseFloat(numberString).toFixed(2);
  return number.toLocaleString("USD");
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <Input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <Input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records ...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

// function SliderColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   const [min, max] = React.useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     preFilteredRows.forEach(row => {
//       min = Math.min(row.values[id], min);
//       max = Math.max(row.values[id], max);
//     });
//     return [min, max];
//   }, [id, preFilteredRows]);

//   return (
//     <>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={filterValue || min}
//         onChange={e => {
//           setFilter(parseInt(e.target.value, 10));
//         }}
//       />
//       <button onClick={() => setFilter(undefined)}>Off</button>
//     </>
//   );
// }

function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  // const [min, max] = React.useMemo(() => {
  //   let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
  //   let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
  //   preFilteredRows.forEach(row => {
  //     min = Math.min(row.values[id], min);
  //     max = Math.max(row.values[id], max);
  //   });
  //   return [min, max];
  // }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Input
        value={filterValue[0] || ""}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        style={{
          width: "70px",
          marginRight: "0.5rem",
        }}
        placeholder="min"
      />
      TO
      <Input
        value={filterValue[1] || ""}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        style={{
          width: "70px",
          marginLeft: "0.5rem",
        }}
        placeholder="max"
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = val => !val;

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}
filterGreaterThan.autoRemove = val => typeof val !== "number";

export default function ProductTable({
  products,
  addToCart,
  openModal,
  closeModal,
  openDeleteModal,
  openEditModal,
  updateCurrentId,
}) {
  const data = React.useMemo(() => [...products], [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        columns: [
          {
            Header: "ID",
            accessor: "id",
            Cell: ({ value }) => <div className="f-weight-700"># {value}</div>,
          },
          {
            Header: "Title",
            accessor: "title",
            Cell: row => (
              <Link
                to={{ pathname: `/product/${row.row.original.id}` }}
                onClick={() => updateCurrentId(row.row.original.id)}
              >
                <div className="t-blue f-weight-700">
                  {row.row.original.title}
                </div>
              </Link>
            ),
          },
          {
            Header: "Company",
            accessor: "company",
            Cell: ({ value }) => <div className="f-weight-500">{value}</div>,
            filter: "fuzzyText",
          },
          {
            Header: "Price",
            accessor: "price",
            Filter: NumberRangeColumnFilter,
            filter: "between",
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
            Filter: SelectColumnFilter,
            filter: "includes",
            Cell: ({ value }) => (
              <div className="t-info f-weight-500">{value}</div>
            ),
          },
          {
            Header: "Stock",
            accessor: "inStock",
            Filter: NumberRangeColumnFilter,
            filter: "between",
            Cell: ({ value }) => (
              <div className="t-grey text-right">{value}</div>
            ),
          },
          {
            Header: "Min. Stock",
            accessor: "minStock",
            Filter: NumberRangeColumnFilter,
            filter: "between",
            Cell: ({ value }) => (
              <div className="t-grey text-right">{value}</div>
            ),
          },
          {
            Header: "Status",
            accessor: data => data.inStock - data.minStock,
            Filter: NumberRangeColumnFilter,
            filter: "between",
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
            disableFilters: true,
            disableSortBy: true,
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
          {
            Header: "Action",
            accessor: "total",
            disableFilters: true,
            disableSortBy: true,
            Cell: row => (
              <div>
                <EditIcon
                  className="cp"
                  color="primary"
                  onClick={() => {
                    openEditModal(row.row.original.id);
                  }}
                />
                <DeleteIcon
                  className="cp"
                  color="secondary"
                  onClick={() => {
                    openDeleteModal(row.row.original.id);
                  }}
                />
              </div>
            ),
          },
        ],
      },
    ],
    [addToCart, openModal, openDeleteModal, openEditModal, updateCurrentId]
  );

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Company", key: "company" },
    { label: "Info", key: "info" },
    { label: "Price", key: "price" },
    { label: "Department", key: "department" },
    { label: "In Stock", key: "inStock" },
    { label: "Minimum Stock level", key: "minStock" },
  ];

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Styles>
      <>
        <table {...getTableProps()} className="mx-auto">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                className="tHeaderGroups"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting.
                  <th {...column.getHeaderProps()}>
                    <div>
                      <span {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
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
        <br />

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
          <CSVLink data={data} headers={csvHeaders} className="mx-auto export">
            <GetAppIcon /> <p className="fl">Excel Export</p>
          </CSVLink>
          <ExportProducts products={products} />
        </div>
      </>
    </Styles>
  );
}
