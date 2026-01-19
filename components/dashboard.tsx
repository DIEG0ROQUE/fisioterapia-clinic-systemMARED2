"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe 
} from "lucide-react"
import DashboardHome from "@/components/dashboard/dashboard-home"
import DashboardCalendar from "@/components/dashboard/dashboard-calendar"
import DashboardPatients from "@/components/dashboard/dashboard-patients"
import DashboardFinances from "@/components/dashboard/dashboard-finances"
import DashboardSettings from "@/components/dashboard/dashboard-settings"

interface DashboardProps {
  user: {
    name: string
    role: "fisioterapeuta" | "colaborador"
    email: string
  }
  onLogout: () => void
  onBackToSite: () => void
}

type TabType = "home" | "calendar" | "patients" | "finances" | "settings"

export default function Dashboard({ user, onLogout, onBackToSite }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isFisioterapeuta = user.role === "fisioterapeuta"

  const navItems = [
    { id: "home" as TabType, label: "Inicio", icon: LayoutDashboard, allowed: true },
    { id: "calendar" as TabType, label: "Calendario", icon: Calendar, allowed: true },
    { id: "patients" as TabType, label: "Pacientes", icon: Users, allowed: isFisioterapeuta },
    { id: "finances" as TabType, label: "Finanzas", icon: DollarSign, allowed: isFisioterapeuta },
    { id: "settings" as TabType, label: "Configuración", icon: Settings, allowed: isFisioterapeuta },
  ].filter((item) => item.allowed)

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome user={user} />
      case "calendar":
        return <DashboardCalendar user={user} />
      case "patients":
        return <DashboardPatients />
      case "finances":
        return <DashboardFinances />
      case "settings":
        return <DashboardSettings />
      default:
        return <DashboardHome user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <span className="font-bold text-foreground">MARED</span>
              </div>
              <button
                type="button"
                className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id)
                  setIsSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start bg-transparent" 
              onClick={onBackToSite}
            >
              <Globe className="w-4 h-4 mr-2" />
              Ver Sitio Web
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">
              {navItems.find((item) => item.id === activeTab)?.label || "Panel de Control"}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
