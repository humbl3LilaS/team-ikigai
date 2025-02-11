"use client";

import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getFinishedMonthlySales, getFinishedWeeklySales } from "@/dashboard/actions";
import { processChartData } from "@/dashboard/visualizer";

const chartConfig = {
  desktop: {
    label: "sale",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SaleChart() {

  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const fetchSalesData = async () => {
    const sales = period === "weekly" ? await getFinishedWeeklySales() : await getFinishedMonthlySales();
    return processChartData(sales);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["salesData", period],
    queryFn: fetchSalesData,
    staleTime: 1000 * 60 * 5,
  });

  const totalSales = data?.reduce((sum, sale) => sum + sale.total, 0) || 0;

  // console.log(data);

  return (
    <Card className="w-screen-sm">
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
              <DropdownMenuItem onClick={() => setPeriod("weekly")}>weekly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("monthly")}>monthly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          Showing {period == "monthly" ? "previous month" : "previous 7 days"} data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          isLoading ? <Skeleton className="w-full min-h-32 h-full" />
            :
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
        }
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total Sales: <span className="bg-muted font-medium px-1 py-0.5 mx-1 rounded-sm">${totalSales.toLocaleString()}</span>{period == "weekly" ? "for this week." : "for previous month."}
        </div>
      </CardFooter>
    </Card>
  );
}
