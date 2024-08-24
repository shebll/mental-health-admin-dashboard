"use client";
import { useState } from "react";
import { useDoctorFilters } from "./useDoctorFilters";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { egyptianCities } from "@/data/egyptianCities";
import { specializations } from "@/data/specializations";
import { Slider } from "@mui/material";

const DoctorsFilter = () => {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const {
    filters,
    handleChange,
    resetFilters,
    handleCityChange,
    handleSpecializationChange,
    handleFeesChange,
  } = useDoctorFilters();

  const handleSubmit = () => {
    // Implement filter submission logic if needed
  };

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
          {/* Doctor Name */}
          <div>
            <label htmlFor="DoctorName">Doctor Name</label>
            <Input
              id="DoctorName"
              type="text"
              name="Name"
              placeholder="Doctor Name"
              value={filters.Name}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Specialization */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Specialization">Specialization</label>
            <Select
              name="Specialization"
              value={filters.Specialization}
              onValueChange={handleSpecializationChange}
            >
              <SelectTrigger className="p-2 border rounded">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((specialization, idx) => (
                  <SelectItem key={idx} value={specialization.value}>
                    {specialization.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div className="flex flex-row gap-4">
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

          {/* City */}
          <div className="flex flex-col gap-2">
            <label htmlFor="City">City</label>
            <Select
              name="City"
              value={filters.City}
              onValueChange={handleCityChange}
            >
              <SelectTrigger className="p-2 border rounded">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                {egyptianCities.map((city, idx) => (
                  <SelectItem key={idx} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fees Range */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rangeFees">Range Fees</label>
            <Slider
              name="rangeFees"
              value={[filters.MinFees, filters.MaxFees]}
              onChange={handleFeesChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <div className="fees-inputs">
              <label htmlFor="MinFees">MinFees</label>
              <Input
                id="MinFees"
                type="number"
                name="MinFees"
                placeholder="Min Fees"
                value={filters.MinFees}
                onChange={handleChange}
              />
              <label htmlFor="MaxFees">MaxFees</label>
              <Input
                id="MaxFees"
                type="number"
                name="MaxFees"
                placeholder="Max Fees"
                value={filters.MaxFees}
                onChange={handleChange}
              />
            </div>
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
};

export default DoctorsFilter;
