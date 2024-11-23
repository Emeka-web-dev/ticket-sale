"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RealChart = () => {
  const data = [
    { name: "a", value: 12 },
    { name: "b", value: 16 },
    { name: "c", value: 20 },
    { name: "d", value: 24 },
  ];
  return (
    <ResponsiveContainer width={"100%"} minHeight={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#FAFAFA" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dot={false} dataKey="value" name="Total Sales" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealChart;
