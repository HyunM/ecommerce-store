import React from "react";
import {
  ComposedChart,
  ReferenceLine,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

export default function DoubleBarLineChart() {
  const data = [
    { name: "2015", CA: 590, others: 800, avg: 695 },
    { name: "2016", CA: 868, others: 967, avg: 917 },
    { name: "2017", CA: 1397, others: 1098, avg: 1243 },
    { name: "2018", CA: 1480, others: 1200, avg: 1340 },
    { name: "2019", CA: 1520, others: 1308, avg: 1414 },
    { name: "2020", CA: 1900, others: 1880, avg: 1890 },
  ];
  return (
    <div>
      <div className="col-5 fl mx-auto">
        <h4>Revenue By State</h4>
        <ComposedChart
          width={600}
          height={400}
          data={data}
          stackOffset="sign"
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "Annual",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Revenue (million $)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />

          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="CA" fill="#8884d8" stackId="stack" />
          <Bar dataKey="others" fill="#82ca9d" stackId="stack" />

          <Line type="monotone" dataKey="avg" stroke="#ff7300" />
        </ComposedChart>
      </div>
      <div className="col-3 fr mx-auto">
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
