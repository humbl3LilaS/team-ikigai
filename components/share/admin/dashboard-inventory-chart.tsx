"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { WAREHOUSES } from "@/constants";
import { getAllWarehouseCategory, getProductsCategory } from "@/dashboard/actions";

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

  const [warehouse, setWarehouse] = useState(WAREHOUSES[0]);
  const [all, setAll] = useState(true);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products", { warehouse, all }],
    queryFn: all ? getAllWarehouseCategory : () => getProductsCategory(warehouse),
    staleTime: 1000 * 60 * 30,
  });


  let formattedData: TData[] = [];
  if (isSuccess && data) {
    formattedData = data.map(item => ({
      ...item,
      count: Number(item.count),
    }));
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span className="mr-2">Inventory Products</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                {all ? "All Warehouses" : warehouse}
                <ChevronDownIcon className="ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuItem onClick={() => setAll(true)}>All Warehouses</DropdownMenuItem>
              {
                WAREHOUSES.map((warehouse, i) => (
                  <DropdownMenuItem key={i} onClick={() => {
                    setAll(false);
                    setWarehouse(warehouse);
                  }}>{warehouse}</DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>Inventory Data for {all ? "All warehouses" : warehouse}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="max-w-screen-sm h-52" />
          : <ChartContainer config={chartConfig}>
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
          </ChartContainer>}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm my01">
        <div className="flex gap-2 font-medium leading-none text-muted-foreground">
          Showing {data?.length} categories from warehouse.
        </div>
      </CardFooter>
    </Card>
  );
}
