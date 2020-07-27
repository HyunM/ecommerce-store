import React from "react";

import "@progress/kendo-react-charts";
import "@progress/kendo-react-popup";
import "@progress/kendo-react-inputs";
import "@progress/kendo-react-intl";
import "@progress/kendo-data-query";
import "@progress/kendo-drawing";
import "@progress/kendo-file-saver";

import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";

export default function PieChart({ props }) {
  let tempProducts = [
    {
      category: props.products[0].department,
      value: props.products[0].price * props.products[0].inStock,
    },
  ];

  for (let i = 1; i < props.products.length; i++) {
    for (let j = 0; j < tempProducts.length; j++) {
      if (props.products[i].department === tempProducts[j].category) {
        tempProducts[j].value +=
          props.products[i].price * props.products[i].inStock;
        break;
      } else if (j === tempProducts.length - 1) {
        let tempObj = {
          category: props.products[i].department,
          value: props.products[i].price * props.products[i].inStock,
        };
        tempProducts.push(tempObj);
        break;
      } else {
        continue;
      }
    }
  }

  let totalValue = 0;
  for (let i = 0; i < tempProducts.length; i++) {
    totalValue += tempProducts[i].value;
  }

  for (let i = 0; i < tempProducts.length; i++) {
    tempProducts[i].percentage = parseFloat(
      (tempProducts[i].value / totalValue).toFixed(4)
    );
  }

  console.log(tempProducts);

  const labelContent = props => {
    let formatedNumber = Number(
      props.dataItem.percentage
    ).toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2 });
    return `${props.dataItem.category} : ${formatedNumber}`;
  };

  const ChartContainer = () => (
    <Chart>
      <ChartTitle text="Status of Budget Use By Department" />
      <ChartLegend position="bottom" />
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          data={tempProducts}
          field="percentage"
          categoryField="category"
          labels={{ visible: true, content: labelContent }}
        />
      </ChartSeries>
    </Chart>
  );

  return (
    <my-app>
      <ChartContainer />
    </my-app>
  );
}
