"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getFinishedSales } from "@/dashboard/actions";
// const chartData = [
//   { day: "9", sale: 186 },
//   { day: "10", sale: 305 },
//   { day: "11", sale: 237 },
//   { day: "12", sale: 73 },
//   { day: "13", sale: 209 },
//   { day: "14", sale: 214 },
// ];

const chartConfig = {
  desktop: {
    label: "sale",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SaleChart() {
  // type Tdata = InferSelectModel<typeof Orders>[]
  type Tdata = {
    status: "PENDING" | "CANCEL" | "APPROVE" | "ON_THE_WAY" | "FINISH";
    totalAmount: number,
    createdAt: number;
  }
  const [data, setData] = useState<Tdata[] | undefined>();

  useEffect(() => {
    getFinishedSales().then(sales =>
      setData(sales),
    );
  }, []);

  return (
    <Card className="w-screen-sm max-w-screen-md">
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
        <CardDescription>9-15 February </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="total"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total Sales this week.
        </div>
      </CardFooter>
    </Card>
  );
}
