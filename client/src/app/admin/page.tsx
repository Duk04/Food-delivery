// import { AppSidebar } from "@/components/app-sidebar";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
// import { SiteHeader } from "@/components/site-header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// // Remove the incorrect import of Data type
// // import { Data } from "@dnd-kit/core";

// // Example: Replace with your actual data source
// interface TableDataItem {
//   header: string;
//   id: number;
//   type: string;
//   status: string;
//   target: string;
//   limit: string;
//   reviewer: string;
// }
// const tableData: TableDataItem[] = []; // Replace with your real data

// export default function Page() {
//   return (
//     <SidebarProvider>
//       <AppSidebar variant="inset" />
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               <SectionCards />
//               <div className="px-4 lg:px-6">
//                 <ChartAreaInteractive />
//               </div>
//               <DataTable data={tableData} />
//             </div>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
// export const dynamic = "force-dynamic";
