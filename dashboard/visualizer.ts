import { Tdata } from "./types";

export function processChartData(data: Tdata[]) {
  const dailyTotals: Record<string, number> = {};

  data.forEach(entry => {
    const date = new Date(entry.createdAt).toISOString().split("T")[0];
    if (!dailyTotals[date]) {
      dailyTotals[date] = 0;
    }

    dailyTotals[date] += entry.total;
  });

  const allDates: string[] = [];
  const sortedDates = Object.keys(dailyTotals).sort();
  if (sortedDates.length > 0) {
    const currentDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);

    while (currentDate <= endDate) {
      allDates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const chartData = allDates.map(date => ({
    createdAt: new Date(date),
    total: dailyTotals[date] || 0,
    status: "FINISH" as const,
  }));

  return chartData;
}