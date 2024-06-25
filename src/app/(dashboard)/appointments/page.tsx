"use client";
import AppointmentCard from "@/components/Appointment/AppointmentCard";
import AppointmentDetails from "@/components/Appointment/AppointmentDetails";
import Filter from "@/components/Appointment/Filter";
import { fetchAppointments } from "@/lib/api";
import { Appointment } from "@/types/appointment";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { ref, inView } = useInView({ threshold: 1.0 });
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const getFiltersFromURL = () => {
    return {
      DoctorId: searchParams.get("DoctorId") || "",
      UserId: searchParams.get("UserId") || "",
      StartDate: searchParams.get("StartDate") || "",
      EndDate: searchParams.get("EndDate") || "",
      Status: searchParams.get("Status") || "",
    };
  };
  const [filters, setFilters] = useState(getFiltersFromURL);

  const loadAppointments = useCallback(async (page: number, filters: any) => {
    setLoading(true);
    const data = await fetchAppointments(page, pageSize, filters);
    setAppointments((prev) => (page === 1 ? data : [...prev, ...data]));
    setHasMore(data.length === pageSize);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAppointments(1, filters);
  }, [filters, loadAppointments]);

  useEffect(() => {
    loadAppointments(page, filters);
  }, [page, loadAppointments, filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.DoctorId) params.set("DoctorId", filters.DoctorId);
    if (filters.UserId) params.set("UserId", filters.UserId);
    if (filters.StartDate) params.set("StartDate", filters.StartDate);
    if (filters.EndDate) params.set("EndDate", filters.EndDate);
    if (filters.Status) params.set("Status", filters.Status);

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  const resetFilters = () => {
    handleStatusChange(" ");
    setFilters({
      DoctorId: "",
      UserId: "",
      Status: "",
      StartDate: "",
      EndDate: "",
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

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      Status: status,
    }));
  };

  const handleSubmit = () => {
    handleFilterChange(filters);
  };

  console.log(filters.Status);
  return (
    <div className="container mx-auto p-4 max-w-[820px]">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="py-10 flex flex-col gap-6 ">
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
            <Select
              defaultValue={filters.Status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="p-2 border rounded">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All Statuses</SelectItem>
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
            Rest Filters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onClick={() => setSelectedAppointment(appointment)}
          />
        ))}
      </div>
      {loading && (
        <>
          <AppointmentLoading />
          <AppointmentLoading />
          <AppointmentLoading />
          <AppointmentLoading />
          <AppointmentLoading />
        </>
      )}
      <div ref={ref} />
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;

const AppointmentLoading = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-14 bg-secondary/50 mt-4 p-4 rounded-md ">
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
        <div className="flex flex-col gap-4 w-full">
          <span className="w-[40%] h-4 bg-secondary/50 rounded-lg  animate-pulse"></span>
          <div className="flex items-start gap-6 w-full">
            <span className="w-[100px] h-[100px] rounded-full bg-secondary/50 animate-pulse"></span>
            <div className="flex flex-col gap-2 w-[50%]">
              <h2 className="w-[74%] h-6 bg-secondary/50 rounded-lg animate-pulse"></h2>
              <p className="w-[87%] h-4 bg-secondary/50 rounded-lg animate-pulse"></p>
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
