"use client";

import UsersFeed from "../../../components/Users/UsersFeed";
import UsersFilter from "../../../components/Users/usersFilter";
import { UserFiltersProvider } from "../../../components/Users/useUserFilter";

const UsersPage = () => {
  return (
    <UserFiltersProvider>
      <div className="container mx-auto p-4 max-w-[900px]">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <div className="flex gap-4">
          <UsersFeed />
          <UsersFilter />
        </div>
      </div>
    </UserFiltersProvider>
  );
};

export default UsersPage;
