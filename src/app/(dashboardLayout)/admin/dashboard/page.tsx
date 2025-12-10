import { cookies } from "next/headers";

async function getStats() {
  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/stats`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function AdminDashboardPage() {
  const result = await getStats();
  const stats = result?.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {!stats ? (
        <p className="text-red-500">Failed to load dashboard stats</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>

          <div className="p-6 border rounded-lg shadow">
            <h2 className="text-lg font-medium">Travel Plans</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalTravelPlans}</p>
          </div>

          <div className="p-6 border rounded-lg shadow">
            <h2 className="text-lg font-medium">Total Reviews</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalReviews}</p>
          </div>
        </div>
      )}
    </div>
  );
}
