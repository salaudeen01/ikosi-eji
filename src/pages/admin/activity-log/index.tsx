"use client";

import ArticleSkeleton from "@/components/ArticleSkeleton";
import Layout from "@/components/layout/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useActivityLogs } from "@/hooks/mutatiion/useActivityLog";
import { useActivityLogStore } from "@/store/useActivityLogStore";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ActivityLogTable() {
  const { page, limit, search, action, userId, adminId, setFilters } = useActivityLogStore();
  const { data, isLoading, isError, refetch } = useActivityLogs({
    page,
    limit,
    search,
    action,
    userId,
    adminId,
  });

  const [searchText, setSearchText] = useState(search);

  const handleSearch = () => setFilters({ search: searchText, page: 1 });

  if (isLoading) return <ArticleSkeleton />;
  if (isError) return (
    <ErrorState
      message="Failed to fetch article details."
      onRetry={() => refetch()}
    />
  );

  const logs = data?.data || [];

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Activities Log</h1>
        <div className='flex gap-2'>
          <div className='flex'>
            <Input 
              className='w-full'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder='search...'
            />
            <Button
              onClick={handleSearch}
              className='rounded-r-lg'
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card className="">
        <CardHeader />
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>email</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-t">
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.userName ?? "Nil"}</TableCell>
                    <TableCell>{log.adminName ?? "Nil"}</TableCell>
                    <TableCell>{log.adminEmail ? log.adminEmail: log.userEmail ?? "Nil"}</TableCell>
                    <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {data?.pagination && (
            <div className="mt-4 flex justify-between items-center text-sm">
              <span>
                {/* Page {data?.pagination.page} of {data?.pagination.totalPages} */}
                Page {page} of {data?.pagination?.totalPages ?? 1}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setFilters({ page: page - 1 })}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  disabled={page >= (data?.pagination?.totalPages ?? 1)}
                  onClick={() => setFilters({ page: page + 1 })}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
