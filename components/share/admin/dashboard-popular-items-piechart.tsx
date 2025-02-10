"use client";

// import { TrendingUp } from "lucide-react";
// import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { getPopularItems } from "@/dashboard/actions";
const data = [
  { product: "laptop", total: 275 },
  { product: "desktop", total: 200 },
  { product: "printer", total: 187 },
  { product: "new", total: 173 },
  { product: "old", total: 90 },
];

// const chartConfig = {
//   totalQuantity: {
//     label: "totalQuantity",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;

export function PopularItemsChart() {

  // const [data, setData] = useState();

  // useEffect(() => {
  //   getPopularItems().then((items) => {
  //     setData(items);
  //   });
  // }, []);
  // console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%" className='bg-red-500 size-96'>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="total"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
