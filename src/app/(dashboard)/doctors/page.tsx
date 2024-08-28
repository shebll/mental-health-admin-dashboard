"use client";
import { DoctorFiltersProvider } from "@/components/Doctors/useDoctorFilters";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import DoctorsFilter from "@/components/Doctors/DoctorsFilter";
import DoctorsFeed from "@/components/Doctors/DoctorsFeed";

const DoctorsPage = () => {
  return (
    <DoctorFiltersProvider>
      <div className="container mx-auto p-4 max-w-[1200px]">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Doctors</h1>
          <Link href="/doctors/add">
            <button className="flex items-center p-2 text-sm bg-green-700 text-white rounded">
              Add new doctor
              <PlusCircleIcon className="ml-2" />
            </button>
          </Link>
        </div>
        <div className="flex flex-row-reverse gap-6">
          <DoctorsFilter />
          <DoctorsFeed />
        </div>
      </div>
    </DoctorFiltersProvider>
  );
};

export default DoctorsPage;
