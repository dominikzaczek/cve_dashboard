import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Title from "../Title";

// Generate Sales Data
function createData(
  time: string,
  low: number | undefined,
  medium: number | undefined,
  high: number | undefined
) {
  return { time, low, medium, high };
}

const data = [
  createData("Jan", 0, 5, 9),
  createData("Feb", 300, 70, 199),
  createData("Mar", 600, 730, 510),
  createData("Apr", 800, 190, 330),
  createData("May", 1500, 510, 190),
  createData("Jun", 2000, 1745, 1113),
  createData("July", 2400, 2007, 390),
  createData("August", 1700, 800, 1200),
  createData("September", 2400, 1987, 2005),
  createData("October", 2400, 2011, 180),
  createData("November", 2400, 987, 205),
  createData("December", 2400, 760, 995),
];

export default function Chart(props: {
  data?: any;
  year: number;
  severity: { low: boolean; medium: boolean; high: boolean };
}) {
  // const years = iterateData(props.data)
  if (props.year) {
    if (props.severity.low || props.severity.medium || props.severity.high) {
      return (
        <React.Fragment>
          <Title>CVE by month in {props.year}</Title>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              {props.severity.low ? (
                <Line type="monotone" dataKey="low" stroke="#8884d8" />
              ) : null}
              {props.severity.medium ? (
                <Line type="monotone" dataKey="medium" stroke="#82ca9d" />
              ) : null}

              {props.severity.high ? (
                <Line type="monotone" dataKey="high" stroke="#82779d" />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
      );
    } else {
      return <p>Please, select severity to generate the chart</p>;
    }
  } else {
    return <p>Please, select year and severity to generate the chart</p>;
  }
}
