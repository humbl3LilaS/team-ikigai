"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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


const chartConfig = {
  quantity: {
    label: "Quantity Sold",
  },
} satisfies ChartConfig;

export function PopularItemsChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["popular-items"],
    queryFn: getPopularItems,
  });

  if (isLoading) {
    return <Skeleton className="w-full min-h-32" />;
  }

  // console.log(chartData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Popular Items</CardTitle>
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
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top-selling items
        </div>
      </CardFooter>
    </Card>
  );
}
