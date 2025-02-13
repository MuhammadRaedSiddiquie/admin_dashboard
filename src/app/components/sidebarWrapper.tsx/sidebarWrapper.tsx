"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "../app-sidebar/app-sidebar";


export default function SidebarWrapper() {
  const pathname = usePathname();

  // Hide sidebar on specific pages
  const hideSidebar = ["/admin/login", "/", "/signup"].includes(pathname);

  return !hideSidebar ? <AppSidebar /> : null;
}
