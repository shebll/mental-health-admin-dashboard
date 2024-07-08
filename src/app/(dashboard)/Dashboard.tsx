"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSummary } from "@/lib/api";
import ErrorAlert from "@/components/dashboard/ErrorAlert";
import StatCard from "@/components/dashboard/StatCard";
import TestResultsChart from "@/components/dashboard/TestResultsChart";
import AgeGroupDistributionChart from "@/components/dashboard/AgeGroupDistributionChart";
import GenderDistributionChart from "@/components/dashboard/GenderDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Activity, Calendar, UserCheck, Users } from "lucide-react";
import axios from "axios";

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
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const summaryData = await fetchSummary(token as string);
        setData(summaryData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // if api provider given error
          if (error.response) {
            setError(`Error : ${error.response.data.message}`);
          } else {
            setError(`Error : ${error.message}`);
          }
        } else if (error instanceof Error) {
          setError(`${error.message}`);
        } else {
          setError("Something went wrong try again");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [token]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!data) {
    return null;
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
