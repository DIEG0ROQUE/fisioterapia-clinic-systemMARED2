"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, DollarSign, Clock, Bell } from "lucide-react"

interface DashboardHomeProps {
  user: {
    name: string
    role: "fisioterapeuta" | "colaborador"
  }
}

interface Appointment {
  id: string
  patientName: string
  date: string
  time: string
  service: string
  status: string
}

export default function DashboardHome({ user }: DashboardHomeProps) {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    monthlyIncome: 0,
    pendingAppointments: 0,
  })
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])
  const [recentNotifications, setRecentNotifications] = useState<{ id: string; message: string; time: string }[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const today = new Date().toISOString().split("T")[0]
    
    // Load appointments
    const appointments: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]")
    const todayAppts = appointments.filter((a) => a.date === today)
    const pendingAppts = appointments.filter((a) => a.status === "pendiente")
    
    // Load patients
    const patients = JSON.parse(localStorage.getItem("patients") || "[]")
    
    // Load finances
    const finances = JSON.parse(localStorage.getItem("finances") || '{"income":[],"expenses":[]}')
    const currentMonth = new Date().getMonth()
    const monthlyIncome = finances.income
      .filter((i: { date: string }) => new Date(i.date).getMonth() === currentMonth)
      .reduce((acc: number, i: { amount: number }) => acc + i.amount, 0)

    setStats({
      todayAppointments: todayAppts.length,
      totalPatients: patients.length,
      monthlyIncome,
      pendingAppointments: pendingAppts.length,
    })

    setTodayAppointments(todayAppts.slice(0, 5))

    // Generate notifications
    const notifications = pendingAppts.slice(0, 3).map((a) => ({
      id: a.id,
      message: `Nueva cita de ${a.patientName}`,
      time: "Reciente",
    }))
    setRecentNotifications(notifications)
  }

  const statCards = [
    {
      title: "Citas Hoy",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Pacientes",
      value: stats.totalPatients,
      icon: Users,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Ingresos del Mes",
      value: `$${stats.monthlyIncome.toLocaleString()}`,
      icon: DollarSign,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      show: user.role === "fisioterapeuta",
    },
    {
      title: "Citas Pendientes",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ].filter((card) => card.show !== false)

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Bienvenido, {user.name.split(" ")[0]}
        </h2>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("es-MX", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              Citas de Hoy
            </CardTitle>
            <CardDescription>Próximas citas programadas para hoy</CardDescription>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {appointment.patientName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{appointment.patientName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground text-sm">{appointment.time}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        appointment.status === "confirmada" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-chart-5/10 text-chart-5"
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay citas programadas para hoy</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="w-5 h-5 text-primary" />
              Notificaciones
            </CardTitle>
            <CardDescription>Actividad reciente en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {recentNotifications.length > 0 ? (
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay notificaciones nuevas</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
