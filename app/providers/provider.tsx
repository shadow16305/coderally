"use client";

import { SidebarProvider } from "@/context/sidebar-context";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
};
