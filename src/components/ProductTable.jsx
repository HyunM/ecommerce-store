import React, { Component } from "react";
import DataTable from "react-data-table-component";

export default class ProductTable extends Component {
  render() {
    const data = [...this.props.products];
    return (
      <div className="App">
        <div className="card">
          <DataTable
            columns={columns}
            data={data}
            defaultSortField="title"
            pagination
            search
            // customStyles={customStyles}
          />
        </div>
      </div>
    );
  }
}

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Company",
    selector: "company",
    sortable: true,
    right: true,
  },
  {
    name: "Department",
    selector: "department",
    sortable: true,
    right: true,
  },
  {
    name: "image",
    selector: "img",
    sortable: true,
    right: true,
  },
];

// const customStyles = {
//   rows: {
//     style: {
//       minHeight: "72px", // override the row height
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for head cells
//       paddingRight: "8px",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for data cells
//       paddingRight: "8px",
//     },
//   },
// };
