"use client";

import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";

function NotFound({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <AlertOctagon size={140} />
      <p>Not Found Page</p>
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          <p>back to home</p>
        </Button>
        <Button variant={"secondary"} onClick={reset}>
          <p>reset</p>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
