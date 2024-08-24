"use client";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { fetchSummary } from "@/lib/api";

import ErrorAlert from "@/components/dashboard/ErrorAlert";
import StatCard from "@/components/dashboard/StatCard";
import TestResultsChart from "@/components/dashboard/TestResultsChart";
import AgeGroupDistributionChart from "@/components/dashboard/AgeGroupDistributionChart";
import GenderDistributionChart from "@/components/dashboard/GenderDistributionChart";

import { useAuth } from "@/context/AuthContext";
import { Activity, Calendar, UserCheck, Users } from "lucide-react";

interface DashboardData {
  totalAppointmentsCount: number;
  totalPostCount: number;
  totalUserCount: number;
  totalDoctorCount: number;
  testResultsCount: {
    Depressed: number;
    Negative: number;
    Normal: number;
  };
  testResultsGenderDistributions: {
    [key: string]: {
      male: number;
      female: number;
      total: number;
    };
  };
  testResultsAgeGroupDistributions: {
    [key: string]: {
      ageGroup1: number;
      ageGroup2: number;
      ageGroup3: number;
    };
  };
}

export default function DashboardPage() {
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchSummary(token as string),
    queryKey: ["analytics"],
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }
  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50 dark:bg-background">
      <h1 className="text-4xl font-bold mb-8 text-secondary-900">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Appointments"
          value={data.totalAppointmentsCount}
          icon={<Calendar size={40} />}
          link="/appointments"
        />
        <StatCard
          title="Posts"
          value={data.totalPostCount}
          icon={<Activity size={40} />}
          link="/forums"
        />
        <StatCard
          title="Users"
          value={data.totalUserCount}
          icon={<Users size={40} />}
          link="/users"
        />
        <StatCard
          title="Doctors"
          value={data.totalDoctorCount}
          icon={<UserCheck size={40} />}
          link="/doctors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white  dark:bg-secondary shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-secondary-800">
              Test Results Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TestResultsChart data={data.testResultsCount} />
          </CardContent>
        </Card>

        <Card className="bg-white  dark:bg-secondary shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-secondary-800">
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GenderDistributionChart
              data={data.testResultsGenderDistributions}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white  dark:bg-secondary shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-secondary-800">
            Age Group Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AgeGroupDistributionChart
            data={data.testResultsAgeGroupDistributions}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Skeleton className="h-12 w-64 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
      </div>
      <Skeleton className="h-[600px]" />
    </div>
  );
}
