import { Slash } from "lucide-react"
import { FiSidebar } from "react-icons/fi";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";



export default function Home() {
  return (
    <section className="w-full flex items-start bg-[#f3f3f3] px-6">
      <div className="px-4 py-6 gap-6 flex items-center">
        {/* <FiSidebar className="text-2xl" /> */}
        <SidebarTrigger />
        <Breadcrumbs text={'Overview'}></Breadcrumbs>
      </div>
      



    </section>
  );
}
