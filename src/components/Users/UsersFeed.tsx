import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";

import UserCard from "@/components/Users/UserCard";
import UserDetails from "@/components/Users/UserDetails";
import InfinityScrolling from "../layout/InfinityScrolling";
import { useUserFilters } from "./useUserFilter";

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

  // console.log("data", data);
  // console.log("isFetchingNextPage", isFetchingNextPage);
  // console.log("hasNextPage", hasNextPage);
  // console.log("fetchNextPage", fetchNextPage);
  // console.log("isError", isError);
  // console.log("isLoading", isLoading);
  // console.log("error", error);

  return (
    <div className="flex-1">
      <div className="flex flex-row-reverse gap-6">
        <div className="flex-1 flex flex-col gap-4">
          {data?.pages
            .flatMap((data) => data.data)
            .map((user) => (
              <UserCard
                onDelete={() => {}}
                key={user.id}
                User={user}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          {data?.pages[0].data.length == 0 && !isLoading && (
            <p>No Users Found</p>
          )}
          {(isLoading || isFetchingNextPage) && (
            <div className="flex flex-col gap-4">
              <UserLoading />
              <UserLoading />
              <UserLoading />
              <UserLoading />
              <UserLoading />
            </div>
          )}
        </div>
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
    <div className="flex flex-col justify-start items-start gap-14 bg-secondary/50  p-4 rounded-md ">
      <div className="flex flex-col md:flex-row  justify-start gap-20 items-start w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-start gap-6">
            <span className="w-[100px] h-[100px] rounded-full bg-secondary/50 animate-pulse"></span>

            <div className="flex flex-col gap-2 w-[50%]">
              <h2 className="w-[84%] h-6 bg-secondary/50 rounded-lg animate-pulse"></h2>
              <p className="w-[67%] h-4 bg-secondary/50 rounded-lg animate-pulse"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <span className="w-[26%] h-4 bg-secondary/50 rounded-md animate-pulse"></span>
        <p className="w-[24%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[67%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
      </div>
    </div>
  );
};
