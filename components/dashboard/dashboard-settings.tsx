"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Save,
  ImageIcon as ImageIcon
} from "lucide-react"

interface ClinicSettings {
  name: string
  description: string
  phone: string
  email: string
  address: string
  schedule: string
  whatsapp: string
}

export default function DashboardSettings() {
  const [settings, setSettings] = useState<ClinicSettings>({
    name: "MARED",
    description: "Centro especializado en fisioterapia y rehabilitación. Tu salud es nuestra prioridad.",
    phone: "951 392 6419",
    email: "contacto@MARED.com",
    address: "Armenta y Lopez #1026, Col. Centro",
    schedule: "Lunes a Viernes: 8:00 - 19:00, Sábado: 8:00 - 14:00",
    whatsapp: "5551234567",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("clinicSettings")
    if (stored) {
      setSettings(JSON.parse(stored))
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    
    // Simulate save delay
    setTimeout(() => {
      localStorage.setItem("clinicSettings", JSON.stringify(settings))
      setIsSaving(false)
      setSaved(true)
      
      setTimeout(() => setSaved(false), 3000)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
          <p className="text-muted-foreground">Administra la información de tu clínica</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar Cambios"}
        </Button>
      </div>

      {/* General Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building className="w-5 h-5 text-primary" />
            Información General
          </CardTitle>
          <CardDescription>Datos básicos de la clínica que aparecen en la página web</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clinic-name">Nombre de la Clínica</Label>
            <Input
              id="clinic-name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              placeholder="Nombre de tu clínica"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinic-description">Descripción</Label>
            <Textarea
              id="clinic-description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              placeholder="Breve descripción de la clínica"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Phone className="w-5 h-5 text-primary" />
            Información de Contacto
          </CardTitle>
          <CardDescription>Datos de contacto visibles para los pacientes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic-phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="clinic-phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="951-000-0000"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinic-whatsapp">WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="clinic-whatsapp"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  placeholder="5550000000 (sin espacios ni guiones)"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinic-email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="clinic-email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="contacto@clinica.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinic-address">Dirección</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="clinic-address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Dirección completa de la clínica"
                className="pl-10"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock className="w-5 h-5 text-primary" />
            Horarios de Atención
          </CardTitle>
          <CardDescription>Define los horarios de la clínica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="clinic-schedule">Horario</Label>
            <Textarea
              id="clinic-schedule"
              value={settings.schedule}
              onChange={(e) => setSettings({ ...settings, schedule: e.target.value })}
              placeholder="Ej: Lunes a Viernes: 8:00 - 19:00"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gallery Management Placeholder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ImageIcon className="w-5 h-5 text-primary" />
            Galería de Imágenes
          </CardTitle>
          <CardDescription>Administra las fotos de tu clínica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">
              Arrastra imágenes aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground">
              Esta función requiere integración con almacenamiento en la nube
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button (Mobile) */}
      <div className="lg:hidden">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
