import Image from "next/image";
import { Session } from "next-auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecentDeliveriesByDriverId } from "@/dashboard/actions";

export default async function DriverDashboardList({ session }: { session: Session | null }) {
  const recentDelis = await getRecentDeliveriesByDriverId(session?.user.id || "");
  // console.log(recentDelis);
  return (
    <div className="mt-5">
      <h1 className="admin-header">Recent Deliveries</h1>

      <div className="flex flex-col gap-3">
        {
          recentDelis.map((deli, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{deli.product}</CardTitle>
                <CardDescription>
                  <p>
                    <span className="bg-muted px-2 py-0.5 rounded-sm">{deli.brand} </span>
                    <span className="bg-muted px-2 py-0.5 rounded-sm ml-1">{deli.category}</span>
                  </p>
                  <p>{deli.date.toLocaleDateString()}</p>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex border-b gap-3">
                <Image src={deli.img} width={100} height={100} alt={deli.product} className="object-contain" />
                <div className="text-sm *:leading-6 text-foreground/80">
                  <p>{deli.customerName}</p>
                  <p>{deli.customerEmail}</p>
                  <p>{deli.customerPhone}</p>
                  <p>{deli.location}</p>
                </div>
              </CardContent>

              <CardFooter className="w-full">
                <p className="text-right w-full tabular-nums text-sm">
                  ${deli.productPrice.toLocaleString()} x {deli.quantity} = <span className="font-medium">${(deli.productPrice * deli.quantity).toLocaleString()}</span>
                </p>
              </CardFooter>
            </Card>
          ))
        }
      </div>

    </div >
  );
}
