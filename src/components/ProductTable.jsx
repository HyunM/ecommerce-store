import React from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

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
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Department",
            accessor: "department",
          },
          {
            Header: "Price",
            accessor: "price",
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
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const firstPageRows = rows.slice(0, 20);

  return (
    <Styles>
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
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
            {firstPageRows.map((row, i) => {
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
        <div>Showing the first 20 results of {rows.length} rows</div>
      </>
    </Styles>
  );
}
