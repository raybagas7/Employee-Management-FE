import React from "react";
import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "../ui/toggle-mode";
import { Toaster } from "../ui/sonner";
import MainNavigation from "../Navigation/MainNavigation";

const AdminLayout = ({ children }: ICoreLayout) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`relative flex min-h-[100dvh] flex-col overflow-hidden`}>
        <div className="fixed bottom-5 right-5 z-[100] max-md:bottom-14">
          <ModeToggle />
        </div>
        <MainNavigation />
        <div className="w-full">{children}</div>
        <Toaster richColors closeButton />
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
