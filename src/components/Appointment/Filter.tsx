import { FC, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

interface FilterProps {
  onChange: (filters: any) => void;
}

const Filter: FC<FilterProps> = ({ onChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    onChange(filters);
  }, []);

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
    onChange(filters);
  };
  return (
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
          <Select onValueChange={handleStatusChange}>
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
      </div>
    </div>
  );
};

export default Filter;
