import { auth } from "@/auth";
// import { getDeliveriesByDriverId } from "@/dashboard/actions";

export default async function DriverDashboard() {
  const session = await auth();
  // const res = await getDeliveriesByDriverId(session?.user.id || "");
  // console.log(res);
  return (
    <section className="">
      Driver Dashboard {session?.user.id}
    </section>
  );
}
