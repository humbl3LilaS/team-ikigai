"use client";

import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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
import { getProductsCategory } from "@/dashboard/actions";

const chartConfig = {
  Desktop: {
    label: "Laptop",
    color: "white",
  },
  mobile: {
    label: "Printer",
    color: "white",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function InventoryChart() {

  type TData = {
    category: string;
    count: number;
  }

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsCategory,
  });

  let formattedData: TData[] = [];
  if (isSuccess) {
    formattedData = data.map(item => ({
      ...item,
      count: Number(item.count),
    }));

  }

  return (
    isLoading ? <Skeleton className="max-w-screen-sm h-32" />
      :
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Inventory Products</CardTitle>
          <CardDescription>Inventory Data</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={formattedData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="count"
                layout="vertical"
                fill="hsl(var(--chart-1))"
                radius={4}
              >

                <LabelList
                  dataKey="category"
                  position="insideLeft"
                  offset={5}
                  className="fill-foreground"
                  fontSize={12}
                />

                <LabelList
                  dataKey="count"
                  position="right"
                  offset={10}
                  className="fill-muted-foreground"
                  fontSize={12}
                />

              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm my01">
          <div className="flex gap-2 font-medium leading-none text-muted-foreground">
            Showing {data?.length} categories from inventory.
          </div>
        </CardFooter>
      </Card>
  );
}
