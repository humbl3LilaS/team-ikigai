"use client";

import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProductsByCategory } from "@/dashboard/actions";



export function InventoryChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["products-by-category"],
    queryFn: fetchProductsByCategory,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(chartData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Products by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
