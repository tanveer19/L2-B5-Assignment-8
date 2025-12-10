import { cookies } from "next/headers";

export async function toggleBlockUser(id: string, shouldBlock: boolean) {
  "use server";

  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  await fetch(`${process.env.NEXT_PUBLIC_API}/admin/users/${id}/block`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ block: shouldBlock }),
  });
}

async function getUsers() {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/users`, {
    method: "GET",
    credentials: "include",
    headers: { Cookie: cookieHeader },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user: any) => (
              <tr key={user.id} className="border">
                <td className="p-3 border">{user.fullName ?? "N/A"}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border">
                  {user.isBlocked ? (
                    <span className="text-red-500 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="p-3 border">
                  <form
                    action={toggleBlockUser.bind(
                      null,
                      user.id,
                      !user.isBlocked
                    )}
                  >
                    <button
                      type="submit"
                      className={`px-3 py-1 rounded text-white ${
                        user.isBlocked ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </form>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
