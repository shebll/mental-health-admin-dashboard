import { useAuth } from "@/context/AuthContext";

import InfinityScrolling from "../layout/InfinityScrolling";
import { useUserFilters } from "./useUserFilter";
import UserTable from "./UserTable";

import { fetchUsers } from "@/lib/api";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

function UsersFeed() {
  const { filters } = useUserFilters();
  const { token } = useAuth();

  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    isError,
    isLoading,
    error,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchUsers(pageParam, 20, filters, token as string),
    getNextPageParam: (data) => (data.hasNext ? data.page + 1 : undefined),
    getPreviousPageParam: (data) => (data.hasNext ? data.page - 1 : undefined),
    queryKey: ["users", filters, token],
    enabled: !!token,
  });

  const allUsers = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="flex-1">
      <div className="flex-1 flex flex-col gap-4">
        <UserTable users={allUsers} />
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
    </div>
  );
}

export default UsersFeed;

const UserLoading = () => {
  return (
    <Table>
      <TableBody>
        {[...Array(15)].map((_, index) => (
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
