"use client";

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
const chartData = [
  { day: "9", sale: 186 },
  { day: "10", sale: 305 },
  { day: "11", sale: 237 },
  { day: "12", sale: 73 },
  { day: "13", sale: 209 },
  { day: "14", sale: 214 },
  { day: "15", sale: 214 },
];

const chartConfig = {
  desktop: {
    label: "sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboartSaleChart() {
  
  return (
    <Card className="max-w-screen-sm my-5">
      <CardHeader>
        <CardTitle>Weekly Sale</CardTitle>
        <CardDescription>February</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="sale"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total sales for this week.
        </div>
      </CardFooter>
    </Card>
  );
}
