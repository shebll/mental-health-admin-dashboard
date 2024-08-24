import { Filter } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppointmentFilters } from "./useAppointmentFilter";

export default function AppointmentsFilter() {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const { filters, handleChange, resetFilters, handleStatusChange } =
    useAppointmentFilters();

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
            <label htmlFor="DoctorId">DoctorId</label>
            <Input
              id="DoctorId"
              type="text"
              name="DoctorId"
              placeholder="Doctor ID"
              value={filters.DoctorId}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="UserId">UserId</label>
            <Input
              id="UserId"
              type="text"
              name="UserId"
              placeholder="User ID"
              value={filters.UserId}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="StartDate">StartDate</label>
            <Input
              id="StartDate"
              type="date"
              name="StartDate"
              value={filters.StartDate}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="EndDate">EndDate</label>
            <Input
              type="date"
              name="EndDate"
              value={filters.EndDate}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="">
            <label htmlFor="Status">Status</label>
            <Select value={filters.Status} onValueChange={handleStatusChange}>
              <SelectTrigger className="p-2 border rounded">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={" "}>All Statuses</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
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
