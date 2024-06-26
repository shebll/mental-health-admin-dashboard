"use client";
import { fetchDoctors } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Slider } from "@mui/material";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import DoctorCard from "@/components/Doctors/DoctorCard";
import DoctorDetails from "@/components/Doctors/DoctorDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { egyptianCities } from "@/data/egyptianCities";
import { specializations } from "@/data/specializations";
import { Filter } from "lucide-react";

const DoctorsPage = () => {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const { token } = useAuth();
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const { ref, inView } = useInView({ threshold: 1.0 });
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);

  const getFiltersFromURL = () => {
    return {
      Name: searchParams.get("Name") || "",
      Specialization: searchParams.get("Specialization") || "",
      Gender: searchParams.get("Gender") || "",
      City: searchParams.get("City") || "",
      MinFees: parseInt(searchParams.get("MinFees") || "0", 10),
      MaxFees: parseInt(searchParams.get("MaxFees") || "1000", 10),
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const loadDoctors = useCallback(
    async (page: number, filters: any) => {
      setLoading(true);
      const data = await fetchDoctors(page, pageSize, filters, token as string);
      setDoctors((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === pageSize);
      setLoading(false);
    },
    [token]
  );

  useEffect(() => {
    loadDoctors(1, filters);
  }, [filters, loadDoctors]);

  useEffect(() => {
    loadDoctors(page, filters);
  }, [page, loadDoctors, filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.City) params.set("City", filters.City);
    if (filters.Gender) params.set("Gender", filters.Gender);
    if (filters.Name) params.set("Name", filters.Name);
    if (filters.Specialization)
      params.set("Specialization", filters.Specialization);
    if (filters.MaxFees) params.set("MaxFees", filters.MaxFees.toString());
    if (filters.MinFees) params.set("MinFees", filters.MinFees.toString());

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  const handleFeesChange = (event: Event, newValue: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      MinFees: (newValue as number[])[0],
      MaxFees: (newValue as number[])[1],
    }));
  };

  const resetFilters = () => {
    setFilters({
      City: "",
      Name: "",
      Gender: "",
      Specialization: "",
      MinFees: 0,
      MaxFees: 1000,
    });
    router.replace("/doctors");
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

  const handleCityChange = (city: string) => {
    setFilters((prev) => ({
      ...prev,
      City: city,
    }));
  };

  const handleSpecializationChange = (specialization: string) => {
    setFilters((prev) => ({
      ...prev,
      Specialization: specialization,
    }));
  };

  const handleSubmit = () => {
    handleFilterChange(filters);
  };
  const handleDelete = (doctorId: string) => {
    setDoctors([...doctors.filter((doctor) => doctor.id !== doctorId)]);
  };
  return (
    <div className="container mx-auto p-4 max-w-[900px]">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
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
      <div className="flex flex-row-reverse gap-6">
        <div
          className={`flex flex-col gap-6 p-4 border rounded-md h-fit fixed md:sticky top-20 md:top-10 bg-background transition-all ${
            filterPopUp ? "right-[5%]" : " right-[-100%]"
          } `}
        >
          <h1 className="text-2xl font-semibold">Filter</h1>
          <div className="grid grid-cols-1 gap-2">
            <div className="">
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
                  {specializations.map((Specialization, idx) => (
                    <SelectItem key={idx} value={Specialization.value}>
                      {Specialization.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4">
            {doctors.map((doctor) => (
              <DoctorCard
                onDelete={handleDelete}
                key={doctor.id}
                doctor={doctor}
                onClick={() => setSelectedDoctor(doctor)}
              />
            ))}
          </div>
          {loading && (
            <>
              <DoctorLoading />
              <DoctorLoading />
              <DoctorLoading />
              <DoctorLoading />
              <DoctorLoading />
            </>
          )}
        </div>
      </div>
      <div ref={ref} />
      {selectedDoctor && (
        <DoctorDetails
          onDelete={handleDelete}
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorsPage;

const DoctorLoading = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-14 bg-secondary/50 mb-4 p-4 rounded-md ">
      <div className="flex flex-col md:flex-row  justify-start gap-20 items-start w-full">
        <div className="flex flex-col gap-4 w-full">
          <span className="w-[40%] h-4 bg-secondary/50 rounded-lg animate-pulse"></span>
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
        <p className="w-[47%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[68%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
        <p className="w-[37%] h-4 bg-secondary/50 rounded-md animate-pulse"></p>
      </div>
    </div>
  );
};
