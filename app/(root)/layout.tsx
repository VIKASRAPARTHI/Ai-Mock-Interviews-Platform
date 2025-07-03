import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import Navbar from "@/components/Navbar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 px-8 max-sm:px-4 max-w-7xl mx-auto min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
