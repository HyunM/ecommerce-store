import React from "react";
import "./AreaChart.css";

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
  ChartArea,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";

export default function AreaChart({ props }) {
  let tempProducts = [
    {
      category: props.products[0].company,
      value: props.products[0].price * props.products[0].inStock,
    },
  ];

  for (let i = 1; i < props.products.length; i++) {
    for (let j = 0; j < tempProducts.length; j++) {
      if (props.products[i].company === tempProducts[j].category) {
        tempProducts[j].value +=
          props.products[i].price * props.products[i].inStock;
        break;
      } else if (j === tempProducts.length - 1) {
        let tempObj = {
          category: props.products[i].company,
          value: props.products[i].price * props.products[i].inStock,
        };
        tempProducts.push(tempObj);
        break;
      } else {
        continue;
      }
    }
  }

  // let totalValue = 0;
  // for (let i = 0; i < tempProducts.length; i++) {
  //   totalValue += tempProducts[i].value;
  // }

  console.log(tempProducts);

  return (
    <my-app>
      <Chart>
        <ChartTitle text="Expenditure By Company" />
        <ChartArea background="white" margin={30} />
        <ChartSeries>
          <ChartSeriesItem
            data={tempProducts}
            name="Company"
            categoryField={"category"}
          />
        </ChartSeries>
      </Chart>
    </my-app>
  );
}
