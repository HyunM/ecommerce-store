import React from "react";
import PieChart from "./PieChart";
import AreaChart from "./AreaChart";
import DoubleBarLineChart from "./DoubleBarLineChart";
import MultiBarLineChart from "./MultiBarLineChart";

export default function ProductChart(props) {
  return (
    <div className="py-5 mx-auto">
      <div className="container">
        <div className="row col-8">
          <PieChart props={props} />
        </div>
        <div className="row">
          <AreaChart props={props} />
        </div>
        <div className="row">
          <DoubleBarLineChart props={props} />
        </div>
        <hr />
        <div className="row mt-5">
          <MultiBarLineChart props={props} />
        </div>
      </div>
    </div>
  );
}
