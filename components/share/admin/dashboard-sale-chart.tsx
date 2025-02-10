"use client";

import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
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
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getFinishedMonthlySales, getFinishedWeeklySales } from "@/dashboard/actions";
import { Tdata } from "@/dashboard/types";
import { processChartData } from "@/dashboard/visualizer";
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

  const [data, setData] = useState<Tdata[]>();
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  function getWeeklyData() {
    setPeriod("weekly");
    getFinishedWeeklySales().then(sales =>
      setData(processChartData(sales)),
    );
  }

  function getPreviousData() {
    setPeriod("monthly");
    getFinishedMonthlySales().then(sales =>
      setData(processChartData(sales)),
    );
  }

  useEffect(() => {
    getWeeklyData();
  }, []);

  // console.log(data);

  return (
    <Card className="w-screen-sm max-w-screen-md">
      <CardHeader>
        <CardTitle>
          <span className="mr-2">Total Sales</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                {period}
                <ChevronDownIcon className="ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuItem onClick={() => getWeeklyData()}>weekly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => getPreviousData()}>monthly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          Showing {period == "monthly" ? "previous month" : "previous 7 days"} data.
        </CardDescription>
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
              tickLine={true}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => value.getDate()}
              tickSize={2}
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
          Total Sales.
        </div>
      </CardFooter>
    </Card>
  );
}
