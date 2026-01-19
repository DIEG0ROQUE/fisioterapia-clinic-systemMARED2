"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle2 } from "lucide-react"

const services = [
  "Terapia Manual",
  "Rehabilitación Física",
  "Neurorehabilitación",
  "Fisioterapia Cardiopulmonar",
  "Electroterapia",
  "Fisioterapia Geriátrica",
]

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
]

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      // Save appointment to localStorage
      const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
      const newAppointment = {
        id: Date.now().toString(),
        patientName: formData.name,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        date: formData.date,
        time: formData.time,
        service: formData.service,
        notes: formData.notes,
        status: "pendiente",
        therapist: "Por asignar",
        createdAt: new Date().toISOString(),
      }
      appointments.push(newAppointment)
      localStorage.setItem("appointments", JSON.stringify(appointments))

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          service: "",
          notes: "",
        })
      }, 5000)
    }, 1000)
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  if (isSubmitted) {
    return (
      <section id="agendar" className="py-16 md:py-24 bg-primary/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">¡Cita Agendada!</h3>
                <p className="text-muted-foreground mb-4">
                  Hemos recibido tu solicitud de cita. Te contactaremos pronto para confirmar.
                </p>
                <div className="bg-secondary/50 rounded-lg p-4 inline-block">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{formData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{formData.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="agendar" className="py-16 md:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Agenda tu Cita
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Estamos listos para atenderte
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita. 
              También puedes llamarnos directamente al <strong className="text-foreground">951 392 6419</strong>.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Horarios Flexibles</h4>
                  <p className="text-sm text-muted-foreground">Lunes a Sábado de 8:00 AM a 7:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Confirmación Rápida</h4>
                  <p className="text-sm text-muted-foreground">Te contactamos en menos de 24 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Recordatorios Automáticos</h4>
                  <p className="text-sm text-muted-foreground">Recibirás recordatorios antes de tu cita</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Solicitar Cita</CardTitle>
              <CardDescription>Completa tus datos y selecciona el servicio que necesitas</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="951-000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Servicio</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha preferida</Label>
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora preferida</Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => setFormData({ ...formData, time: value })}
                      required
                    >
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Selecciona hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Agendar Cita"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Al enviar este formulario, aceptas que nos pongamos en contacto contigo.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
