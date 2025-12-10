"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  id: string;
  fullName?: string;
  email: string;
  role: string;
  isBlocked: boolean;
};

// Mock function for fetching users
async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/users`, {
    credentials: "include",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

// Server action for block/unblock
async function blockUnblockUser(userId: string, block: boolean) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/admin/users/${userId}/block`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ block }),
    }
  );

  if (!res.ok) throw new Error("Failed to block/unblock user");
  return res.json();
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on mount
  useState(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  });

  const handleBlockToggle = async (userId: string, currentStatus: boolean) => {
    try {
      await blockUnblockUser(userId, !currentStatus);

      // Update state locally
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isBlocked: !currentStatus } : u
        )
      );

      toast.success(
        `User ${!currentStatus ? "blocked" : "unblocked"} successfully`
      );
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />
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
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-3 border">{user.fullName ?? "N/A"}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.role}</td>
              <td className="p-3 border">
                {user.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="p-3 border">
                <button
                  className={`px-3 py-1 rounded text-white ${
                    user.isBlocked ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => handleBlockToggle(user.id, user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
