"use client";
import { fetchUsers } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

import UserCard from "@/components/Users/UserCard";
import UserDetails from "@/components/Users/UserDetails";
import { UserType } from "@/types/UserType";

const UsersPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const { ref, inView } = useInView({ threshold: 1.0 });
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const getFiltersFromURL = () => {
    return {
      Name: searchParams.get("Name") || "",
      Gender: searchParams.get("Gender") || "",
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const loadUsers = useCallback(
    async (page: number, filters: any) => {
      setLoading(true);
      const data = await fetchUsers(page, pageSize, filters, token as string);
      setUsers((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === pageSize);
      setLoading(false);
    },
    [token]
  );

  useEffect(() => {
    loadUsers(1, filters);
  }, [filters, loadUsers]);

  useEffect(() => {
    loadUsers(page, filters);
  }, [page, loadUsers, filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.Gender) params.set("Gender", filters.Gender);
    if (filters.Name) params.set("Name", filters.Name);
    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  const resetFilters = () => {
    setFilters({
      Name: "",
      Gender: "",
    });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleFilterChange(filters);
  };

  return (
    <div className="container mx-auto p-4 max-w-[820px]">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="py-10 flex flex-col gap-6 ">
        <h1 className="text-2xl font-semibold">Filter</h1>
        <div className="grid grid-cols-1 gap-2">
          <div className="">
            <label htmlFor="UserName">User Name</label>
            <Input
              id="UserName"
              type="text"
              name="Name"
              placeholder="User Name"
              value={filters.Name}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-row gap-4">
            <label htmlFor="">Gender:</label>
            <label>
              <input
                type="radio"
                name="Gender"
                value=""
                checked={filters.Gender === ""}
                onChange={handleChange}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="male"
                checked={filters.Gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="female"
                checked={filters.Gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Apply Filters
          </button>
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            User={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>
      {loading && (
        <>
          <UserLoading />
          <UserLoading />
          <UserLoading />
          <UserLoading />
          <UserLoading />
        </>
      )}
      <div ref={ref} />
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UsersPage;

const UserLoading = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-14 bg-secondary/50 mt-4 p-4 rounded-md ">
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
