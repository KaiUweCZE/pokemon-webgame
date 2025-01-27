import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="mb-4">Welcome {session?.user?.name ?? "nobody"}!</p>
      <div className="rounded bg-gray-100 p-4">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
