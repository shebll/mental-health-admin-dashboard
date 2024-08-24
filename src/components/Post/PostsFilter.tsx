import { Filter } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePostFilters } from "./usePostFilter";

export default function PostsFilter() {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const { filters, handleChange, handleCheckboxChange, resetFilters } =
    usePostFilters();

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
          <div>
            <label htmlFor="Title">Title</label>
            <Input
              id="Title"
              type="text"
              name="Title"
              placeholder="Title"
              value={filters.Title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Content">Content</label>
            <Input
              id="Content"
              type="text"
              name="Content"
              placeholder="Content"
              value={filters.Content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Username">Username</label>
            <Input
              id="Username"
              type="text"
              name="Username"
              placeholder="Username"
              value={filters.Username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="StartTime">Start Time</label>
            <Input
              id="StartTime"
              type="datetime-local"
              name="StartTime"
              value={filters.StartTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="EndTime">End Time</label>
            <Input
              id="EndTime"
              type="datetime-local"
              name="EndTime"
              value={filters.EndTime}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ConfessionsOnly"
              checked={filters.ConfessionsOnly}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="ConfessionsOnly">Confessions Only</label>
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
