import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteUserById, fetchUsers } from "@/lib/api";

import UserDetails from "@/components/Users/UserDetails";
import InfinityScrolling from "../layout/InfinityScrolling";
import { useUserFilters } from "./useUserFilter";
import UserTable from "./UserTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

function UsersFeed() {
  const { filters } = useUserFilters();
  console.log(filters);
  const { token } = useAuth();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    isError,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchUsers(pageParam, 10, filters, token as string),
    getNextPageParam: (data) => (data.hasNext ? data.page + 1 : undefined),
    getPreviousPageParam: (data) => (data.hasNext ? data.page - 1 : undefined),
    queryKey: ["users", filters, token],
    enabled: !!token,
  });

  const allUsers = data?.pages.flatMap((page) => page.data) || [];

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUserById(token as string, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
      setSelectedUser(null);
    },
    onError: () => toast.error("Failed to delete user"),
  });

  return (
    <div className="flex-1">
      <div className="flex-1 flex flex-col gap-4">
        <UserTable
          users={allUsers}
          onUserClick={setSelectedUser}
          onDeleteUser={(userId) => deleteMutation.mutate(userId)}
        />
        {allUsers.length === 0 && !isLoading && (
          <p className="text-center mt-4">No Users Found</p>
        )}
        {(isLoading || isFetchingNextPage) && <UserLoading />}
      </div>
      <InfinityScrolling
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onDelete={() => {}}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UsersFeed;

const UserLoading = () => {
  return (
    <Table>
      <TableBody>
        {[...Array(8)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary/50 animate-pulse"></div>
                <div className="w-24 h-4 bg-secondary/50 rounded animate-pulse"></div>
              </div>
            </TableCell>
            <TableCell>
              <div className="w-32 h-4 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-24 h-4 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-16 h-4 bg-secondary/50 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-20 h-6 bg-secondary/50 rounded-full animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
