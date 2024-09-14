"use client";
import { Spinner } from "@/components/spinner";
// import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import { Navigation } from "./_components/navigation";
// import { SearchCommand } from "@/components/search-command";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated, isLoading } = useConvexAuth();

  let isAuthenticated = true;
  let isLoading = false;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="w-full h-full flex bg-background dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {/* <SearchCommand /> */}
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
