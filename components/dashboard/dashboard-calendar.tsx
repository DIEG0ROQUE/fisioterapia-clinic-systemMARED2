"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Clock, 
  User,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  MessageCircle
} from "lucide-react"

interface DashboardCalendarProps {
  user: {
    name: string
    role: "fisioterapeuta" | "colaborador"
  }
}

interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  patientPhone: string
  date: string
  time: string
  therapist: string
  service: string
  status: string
  notes: string
}

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
]

const services = [
  "Terapia Manual",
  "Rehabilitación Física",
  "Neurorehabilitación",
  "Fisioterapia Cardiopulmonar",
  "Electroterapia",
  "Fisioterapia Geriátrica",
]

export default function DashboardCalendar({ user }: DashboardCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  })

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = () => {
    const stored = localStorage.getItem("appointments")
    if (stored) {
      setAppointments(JSON.parse(stored))
    }
  }

  const saveAppointments = (appts: Appointment[]) => {
    localStorage.setItem("appointments", JSON.stringify(appts))
    setAppointments(appts)
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getAppointmentsForDate = (dateStr: string) => {
    return appointments.filter((a) => a.date === dateStr)
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const handleCreateAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time || !newAppointment.service) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    // Check for time conflicts
    const existingAtTime = appointments.find(
      (a) => a.date === newAppointment.date && a.time === newAppointment.time
    )
    if (existingAtTime) {
      alert("Ya existe una cita en ese horario")
      return
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      therapist: user.name,
      status: "confirmada",
    }

    saveAppointments([...appointments, appointment])
    setShowNewAppointment(false)
    setNewAppointment({
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    })
  }

  const handleUpdateStatus = (id: string, status: string) => {
    const updated = appointments.map((a) => 
      a.id === id ? { ...a, status } : a
    )
    saveAppointments(updated)
    setSelectedAppointment(null)
  }

  const handleDeleteAppointment = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta cita?")) {
      const updated = appointments.filter((a) => a.id !== id)
      saveAppointments(updated)
      setSelectedAppointment(null)
    }
  }

  const handleWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Hola ${name}, te escribimos de MARED para confirmar tu cita.`)
    window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`, "_blank")
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Calendario de Citas</h2>
          <p className="text-muted-foreground">Gestiona las citas de la clínica</p>
        </div>
        <Button 
          onClick={() => setShowNewAppointment(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cita
        </Button>
      </div>

      {/* Calendar Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigateMonth(-1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold text-foreground min-w-[180px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigateMonth(1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hoy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const dateStr = formatDateString(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              )
              const dayAppointments = getAppointmentsForDate(dateStr)
              const isToday = dateStr === today
              const isSelected = dateStr === selectedDate

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    aspect-square p-1 rounded-lg text-sm transition-colors relative
                    ${isToday ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}
                    ${isSelected && !isToday ? "ring-2 ring-primary" : ""}
                  `}
                >
                  <span className="block">{day}</span>
                  {dayAppointments.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayAppointments.slice(0, 3).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1 h-1 rounded-full ${isToday ? "bg-primary-foreground" : "bg-primary"}`} 
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Appointments */}
      {selectedDate && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Citas del {new Date(selectedDate + "T12:00:00").toLocaleDateString("es-MX", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </CardTitle>
            <CardDescription>
              {getAppointmentsForDate(selectedDate).length} cita(s) programada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getAppointmentsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getAppointmentsForDate(selectedDate)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{appointment.patientName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{appointment.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === "confirmada" 
                            ? "bg-primary/10 text-primary" 
                            : appointment.status === "cancelada"
                            ? "bg-destructive/10 text-destructive"
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
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay citas para este día</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => {
                    setNewAppointment({ ...newAppointment, date: selectedDate })
                    setShowNewAppointment(true)
                  }}
                >
                  Agendar una cita
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowNewAppointment(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-border max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowNewAppointment(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">Nueva Cita</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre del Paciente *</Label>
                <Input
                  placeholder="Nombre completo"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input
                    placeholder="951-000-0000"
                    value={newAppointment.patientPhone}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={newAppointment.patientEmail}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Servicio *</Label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha *</Label>
                  <Input
                    type="date"
                    min={today}
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hora *</Label>
                  <Select
                    value={newAppointment.time}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notas</Label>
                <Input
                  placeholder="Notas adicionales..."
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNewAppointment(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleCreateAppointment}
                >
                  Crear Cita
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSelectedAppointment(null)}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 border border-border">
            <button
              type="button"
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">Detalles de Cita</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Paciente</p>
                  <p className="font-medium text-foreground">{selectedAppointment.patientName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha y Hora</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedAppointment.date + "T12:00:00").toLocaleDateString("es-MX")} - {selectedAppointment.time}
                  </p>
                </div>
              </div>

              {selectedAppointment.patientPhone && (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium text-foreground">{selectedAppointment.patientPhone}</p>
                  </div>
                </div>
              )}

              {selectedAppointment.patientEmail && (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{selectedAppointment.patientEmail}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                {selectedAppointment.patientPhone && (
                  <Button 
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleWhatsApp(selectedAppointment.patientPhone, selectedAppointment.patientName)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                )}
                <Button 
                  variant="outline"
                  className="text-primary bg-transparent"
                  onClick={() => handleUpdateStatus(selectedAppointment.id, "confirmada")}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
                <Button 
                  variant="outline"
                  className="text-destructive bg-transparent"
                  onClick={() => handleUpdateStatus(selectedAppointment.id, "cancelada")}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>

              {user.role === "fisioterapeuta" && (
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                >
                  Eliminar Cita
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
