/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader2 } from "lucide-react";
import { ErrorState } from "@/components/ui/error-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllUsers } from "@/hooks/mutatiion/useAllUsers";
import Layout from "@/components/layout/shell";

const AllUsers = () => {
  const { data, isLoading, isError, refetch } = useAllUsers();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  if (isError)
    return (
      <ErrorState
        message="Failed to fetch users."
        onRetry={() => refetch()}
      />
    );

  const users = data?.users || [];

  return (
    <Layout>
      <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <Card>
          <CardHeader>
          <CardTitle>Registered Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Name</th>
                  <th className="text-left px-4 py-2 border-b">Email</th>
                  {/* <th className="text-left px-4 py-2 border-b">Role</th> */}
                  <th className="text-left px-4 py-2 border-b">Status</th>
                  <th className="text-left px-4 py-2 border-b">Joined</th>
                </tr>
              </thead>
              <tbody>
                  {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-muted/50">
                      <td className="px-4 py-2 border-b">{user.names}</td>
                      <td className="px-4 py-2 border-b">{user.email}</td>
                      {/* <td className="px-4 py-2 border-b capitalize">{user.role}</td> */}
                      <td
                      className={`px-4 py-2 border-b font-medium ${
                          user.status === "active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                      >
                      {user.status}
                      </td>
                      <td className="px-4 py-2 border-b">
                      {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                  </tr>
                  ))}
              </tbody>
            </table>
          </div>
          </CardContent>
      </Card>
      </div>
    </Layout>
  );
};

export default AllUsers;
