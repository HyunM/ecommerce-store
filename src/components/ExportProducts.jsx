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
    this.save(this._exporter);
  };

  save = component => {
    const options = component.workbookOptions();
    console.log(options);
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach(row => {
      if (row.type === "data") {
        if (altIdx % 2 !== 0) {
          row.cells.forEach(cell => {
            cell.background = "#aabbcc";
          });
        }
        altIdx++;
      }
    });

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].cells.length; j++) {
        if (rows[i].cells[j].value === "Toyota") {
          rows[i].cells[j].background = "#ff0000";
          rows[i].cells[j].value = "* " + rows[i].cells[j].value;
        }
      }
    }

    rows[15].cells[2].background = "#00ff00";
    rows[15].cells[2].value = "I like green!";

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].cells.length > 7 && rows[i].type === "data") {
        rows[i].cells[7].value = rows[i].cells[7].value * 2;
      }
    }

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].cells.length > 8 && rows[i].type === "data") {
        rows[i].cells[8].value =
          rows[i].cells[8].value - rows[i].cells[5].value;
      }
    }

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].cells.length > 9 && rows[i].type === "data") {
        rows[i].cells[9].value = "=SUM(G" + (i + 1) + "-F" + (i + 1) + ")";
      }
    }

    component.save(options);
  };

  customFooter = () => {
    let sumPrice = 0;
    for (let i = 0; i < this.props.products.length; i++) {
      sumPrice += this.props.products[i].price;
    }
    return `Total Sum : ${sumPrice.toFixed(2)}`;
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
          filterable={true}
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
                  color: "#ffff00",
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
            <ExcelExportColumn field="minStock" title="Max Stock" />
            <ExcelExportColumn field="minStock" title="Custom Formula1" />
            <ExcelExportColumn field="minStock" title="Custom Formula2" />
          </ExcelExportColumnGroup>
        </ExcelExport>
      </div>
    );
  }
}
