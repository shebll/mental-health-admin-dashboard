import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactElement } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactElement;
  link: string;
}

export default function StatCard({ title, value, icon, link }: StatCardProps) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
      >
        <Card className="bg-white dark:bg-secondary shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-secondary-700">
              {title}
            </CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary-900">
              {value.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
