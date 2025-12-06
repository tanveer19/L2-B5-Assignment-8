import Link from "next/link";

async function getUsers() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  }).then((res) => res.json());
}

export default async function ExplorePage() {
  const data = await getUsers();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Explore Travelers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.data?.map((user: any) => (
          <Link
            key={user.id}
            href={`/profile/${user.id}`}
            className="border p-4 rounded-lg shadow hover:bg-gray-50 block"
          >
            <h2 className="font-bold">{user.fullName}</h2>
            <p className="text-sm text-gray-600">{user.currentLocation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
