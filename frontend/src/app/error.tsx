"use client";

import Button from "@/components/atoms/ScrollButton";
import React from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[50vh]">
      {/* <div>Error: {error.message}</div>{" "} */}
      <div>Something went wrong please try again later</div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default ErrorBoundary;
