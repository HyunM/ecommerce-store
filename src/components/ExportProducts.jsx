import React, { Component } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { process } from "@progress/kendo-data-query";

export default class ExportProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _exporter;
  export = () => {
    this._exporter.save();
  };

  customFooter = () => {
    let sumPrice = 0;
    for (let i = 0; i < this.props.products.length; i++) {
      sumPrice += this.props.products[i].price;
    }
    return `Total Sum : ${sumPrice}`;
  };

  customGroupHeader = element => {
    return `Category: ${element.value}`;
  };

  customGroupFooter = element => {
    return `Sum : ${element.aggregates.price.sum.toFixed(2)}`;
  };

  render() {
    const data = this.props.products;
    const aggregates = [{ field: "price", aggregate: "sum" }];

    const group = [
      {
        field: "department", //for GroupHeader
        aggregates: aggregates, //for GroupFooter
      },
    ];
    const dataOfGroup = process(data, { group: group }).data; //Group By group

    return (
      <div>
        <button className="k-button" onClick={this.export}>
          Export To xlsx
        </button>

        <ExcelExport
          data={dataOfGroup}
          group={group}
          fileName="Products.xlsx"
          ref={exporter => {
            this._exporter = exporter;
          }}
          from="5"
        >
          <ExcelExportColumnGroup
            title="Product"
            headerCellOptions={{ textAlign: "center", background: "#0000ff" }}
            locked={true}
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
              title="Company"
              locked={"company" === "Samsung"}
              cellOptions={{
                background: "#ffa400",
                textAlign: "center",
                borderLeft: {
                  color: "#ff000",
                },
              }}
            />
            <ExcelExportColumn
              field="department"
              hidden={true}
              cellOptions={{
                bold: true,
              }}
              groupHeader={this.customGroupHeader}
            />

            <ExcelExportColumn
              field="price"
              title="Price"
              hidden={false}
              cellOptions={{
                textAlign: "center",
                borderLeft: {
                  color: "#ff000",
                },
              }}
              groupFooter={this.customGroupFooter}
              footer={this.customFooter}
            />
          </ExcelExportColumnGroup>

          <ExcelExportColumnGroup
            title="Status"
            headerCellOptions={{ textAlign: "center", background: "#00cc00" }}
          >
            <ExcelExportColumn field="inStock" title="In Stock" />
            <ExcelExportColumn field="minStock" title="Min Stock" />
          </ExcelExportColumnGroup>
        </ExcelExport>
      </div>
    );
  }
}
