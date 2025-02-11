"use client";

import { useQuery } from "@tanstack/react-query";
import { LabelList, Pie, PieChart } from "recharts";

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
import { Skeleton } from "@/components/ui/skeleton";
import { getPopularItems } from "@/dashboard/actions";
import { TChartData } from "@/dashboard/types";


export function PopularItemsChart() {

  const { data: chartData, isLoading, isSuccess } = useQuery({
    queryKey: ["quantity"],
    queryFn: getPopularItems,
  });

  if (isLoading) {
    return <Skeleton className="w-full min-h-32" />;
  }

  const chartConfig = {
    quantity: {
      label: "quantity",
    },
  } satisfies ChartConfig;

  if (isSuccess) {
    const colors = ["orange", "steelblue", "green", "cyan", "pink"];
    if (Array.isArray(chartData)) {
      chartData.map((data: TChartData, i) => {
        data["fill"] = colors[i];
      });
    }

    // console.log(chartData);

    // const data = [
    //   { product: "chrome", quantity: 275, fill: "red" },
    //   { product: "safari", quantity: 200, fill: "blue" },
    //   { product: "firefox", quantity: 187, fill: "cyan" },
    //   { product: "edge", quantity: 173, fill: "pink" },
    //   { product: "other", quantity: 90, fill: "teal" },
    // ];



    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <span className="mr-2">Popular Products</span>
          </CardTitle>
          <CardDescription>Top-selling products</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="quantity" nameKey="product" />
              <LabelList
                dataKey="quantity"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Top 5 most popular products.
          </div>
        </CardFooter>
      </Card>
    );
  }
}