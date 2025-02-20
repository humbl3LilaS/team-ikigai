import { cn } from "@/lib/utils";

export default function DashboardCard({ num, title, color }: { num: number, title: string, color: string }) {
  return (
    <div
      className={cn("border p-3 lg:py-5 rounded-md text-center ring-secondary ring-1 basis-1/3", color)}
    >
      <p className="text-3xl lg:text-5xl font-bold">{num}</p>
      <p>{title}</p>
    </div>
  );
}
