"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { TourProvider } from '@reactour/tour'
import { steps } from "@/utils/constants";


const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient()



  return   ( 
    <TourProvider steps={steps}>
  <QueryClientProvider client={queryClient}>
  {children}
  </QueryClientProvider>
    </TourProvider>
  );
};

export default Providers;