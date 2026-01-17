"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTables = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <ClerkPricingTable />
    </div>
  );
};
