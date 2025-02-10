import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  return (
    <section className="">
      <h1 className="">{session?.user.name}</h1>
      <h2 className="capitalize">{session?.user.role} Department</h2>
    </section>
  );
}
