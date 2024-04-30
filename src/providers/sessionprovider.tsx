"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { TourProvider } from '@reactour/tour'
import { steps } from "@/utils/constants";
import { useTheme } from "next-themes";


const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient()

  const { theme } = useTheme()


  return   ( 
    <TourProvider steps={steps}
    styles={{
      popover: (base) => ({
        ...base,
        borderRadius: 20,
        background: theme=="dark" ? "#121415" : "#fff",
        color: theme=="dark" ? "#fafafa" : "#212B36",
        fontSize: "1rem"
      })
    }}>
  <QueryClientProvider client={queryClient}>
  {children}
  </QueryClientProvider>
    </TourProvider>
  );
};

export default Providers;