"use client";

import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

function initials(name?: string) {
  if (!name) return "NA";
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    getUsers()
      .then((data) => {
        if (!mounted) return;
        setUsers(data);
      })
      .catch(() => toast.error("Could not load users"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.fullName?.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, query]);

  const handleBlockToggle = async (userId: string, currentStatus: boolean) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${currentStatus ? "unblock" : "block"} this user?`
    );
    if (!confirmAction) return;

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

  if (loading)
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Review and manage platform users</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or role"
            className="w-[260px]"
          />
          <Button variant="outline" onClick={() => setQuery("")}>Clear</Button>
        </div>
      </div>

      <div className="bg-card rounded-md shadow-sm overflow-hidden">
        <div className="w-full overflow-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No users found</td>
                </tr>
              )}

              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-accent/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">{initials(user.fullName)}</div>
                    <div>
                      <div className="font-medium">{user.fullName ?? "N/A"}</div>
                      <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                    <Button variant={user.isBlocked ? "secondary" : "destructive"} size="sm" onClick={() => handleBlockToggle(user.id, user.isBlocked)}>
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(user.email)}>
                      Copy Email
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
