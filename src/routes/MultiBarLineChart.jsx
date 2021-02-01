import React from "react";
import {
  ComposedChart,
  ReferenceLine,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from "recharts";

export default function MultiBarLineChart() {
  const data = [
    {
      year: "2015",
      CA: 590,
      NV: -800,
      AZ: 200,
      OR: 140,
      East: 1240,
      avg: 695,
      amount: 4500,
      estimation: 5000,
    },
    {
      year: "2016",
      CA: 868,
      NV: 967,
      AZ: 400,
      OR: 380,
      East: 1287,
      avg: 917,
      amount: 5500,
      estimation: 3500,
    },
    {
      year: "2017",
      CA: 1397,
      NV: 1098,
      AZ: 550,
      OR: -450,
      East: 2304,
      avg: 1243,
      amount: 3500,
      estimation: 4000,
    },
    {
      year: "2018",
      CA: 1480,
      NV: 1200,
      AZ: 690,
      OR: 600,
      East: -3467,
      avg: 1340,
      amount: 5800,
      estimation: 6000,
    },
    {
      year: "2019",
      CA: 1520,
      NV: 1308,
      AZ: 790,
      OR: 590,
      East: 3509,
      avg: 1414,
      amount: 5500,
      estimation: 6000,
    },
    {
      year: "2020",
      CA: 1900,
      NV: 1880,
      AZ: 890,
      OR: 680,
      East: 3809,
      avg: 1890,
      amount: 6500,
      estimation: 8900,
    },
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
            dataKey="year"
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
          <Area
            type="monotone"
            dataKey="estimation"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="CA" fill="#8884d8" stackId="stack" />
          <Bar dataKey="NV" fill="#82ca9d" stackId="stack" />
          <Bar dataKey="AZ" fill="#00e6ac" stackId="stack" />
          <Bar dataKey="OR" fill="#66d9ff" stackId="stack" />
          <Bar dataKey="East" fill="#ffc658" stackId="stack2" />

          <Line type="monotone" dataKey="avg" stroke="#ff7300" />
          <Line type="monotone" dataKey="amount" stroke="#ff0000" />
        </ComposedChart>
      </div>
      <div className="col-3 fr mx-auto">
        {/* <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre> */}
      </div>
    </div>
  );
}
