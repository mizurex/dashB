import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import Header from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <SidebarTrigger className="z-50" />
        {children}
      </main>
    </SidebarProvider>
  )
}