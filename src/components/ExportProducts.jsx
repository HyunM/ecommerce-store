import React, { Component } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";

export default class ExportProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _exporter;
  export = () => {
    this._exporter.save();
  };

  render() {
    const data = this.props.products;
    return (
      <div>
        <button className="k-button" onClick={this.export}>
          Export To xlsx
        </button>

        <ExcelExport
          data={data}
          fileName="Products.xlsx"
          ref={exporter => {
            this._exporter = exporter;
          }}
          from="5"
        >
          <ExcelExportColumn
            field="id"
            title="Product ID"
            headerCellOptions={{
              background: "#ff0000",
              textAlign: "center",
            }}
          />
          <ExcelExportColumn
            field="title"
            title="Title"
            width={350}
            cellOptions={{
              bold: true,
            }}
          />
          <ExcelExportColumn
            field="company"
            title="Category"
            hidden={false}
            cellOptions={{
              background: "#ffa400",
              textAlign: "center",
              borderLeft: {
                color: "#ff000",
              },
            }}
          />
        </ExcelExport>
      </div>
    );
  }
}
