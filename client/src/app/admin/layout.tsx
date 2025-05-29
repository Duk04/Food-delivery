import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components";
import { AdminHeader } from "./components";

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <div className="flex p-5 bg-[#F4F4F5] w-full">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />

        <div className="w-full">
          <SidebarTrigger />

          {children}
        </div>
      </SidebarProvider>
      <AdminHeader />
    </div>
  );
}

export default Layout;
