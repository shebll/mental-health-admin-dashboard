import { Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUserFilters } from "./useUserFilter";

export default function UsersFilter() {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const { filters, handleChange, resetFilters } = useUserFilters();
  console.log(filters);

  const handleSubmit = () => {};
  return (
    <>
      <span
        className={`fixed md:hidden top-6 right-10`}
        onClick={() => setFilterPopUp((prev) => !prev)}
      >
        <Filter />
      </span>
      <span
        className={` md:hidden ${
          filterPopUp ? "fixed" : "hidden"
        } inset-0 bg-black/20 backdrop-blur-sm h-screen w-full`}
        onClick={() => setFilterPopUp((prev) => !prev)}
      />
      <div
        className={`flex flex-col gap-6 p-4 border rounded-md h-fit fixed md:sticky top-20 md:top-10 bg-background transition-all ${
          filterPopUp ? "right-[5%]" : " right-[-100%]"
        } `}
      >
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
    </>
  );
}
