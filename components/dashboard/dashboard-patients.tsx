"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Search, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  X,
  Edit,
  Trash2,
  ChevronRight
} from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  phone: string
  email: string
  diagnosis: string
  notes: string
  createdAt: string
  history: {
    date: string
    session: string
    observations: string
  }[]
}

export default function DashboardPatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPatient, setShowNewPatient] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [showAddSession, setShowAddSession] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    diagnosis: "",
    notes: "",
  })

  const [sessionData, setSessionData] = useState({
    session: "",
    observations: "",
  })

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = () => {
    const stored = localStorage.getItem("patients")
    if (stored) {
      setPatients(JSON.parse(stored))
    }
  }

  const savePatients = (pts: Patient[]) => {
    localStorage.setItem("patients", JSON.stringify(pts))
    setPatients(pts)
  }

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  )

  const handleCreatePatient = () => {
    if (!formData.name || !formData.phone) {
      alert("Por favor completa el nombre y teléfono")
      return
    }

    const newPatient: Patient = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age) || 0,
      phone: formData.phone,
      email: formData.email,
      diagnosis: formData.diagnosis,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      history: [],
    }

    savePatients([...patients, newPatient])
    setShowNewPatient(false)
    resetForm()
  }

  const handleUpdatePatient = () => {
    if (!selectedPatient) return

    const updated = patients.map((p) =>
      p.id === selectedPatient.id
        ? {
            ...p,
            name: formData.name,
            age: parseInt(formData.age) || 0,
            phone: formData.phone,
            email: formData.email,
            diagnosis: formData.diagnosis,
            notes: formData.notes,
          }
        : p
    )

    savePatients(updated)
    setSelectedPatient({
      ...selectedPatient,
      name: formData.name,
      age: parseInt(formData.age) || 0,
      phone: formData.phone,
      email: formData.email,
      diagnosis: formData.diagnosis,
      notes: formData.notes,
    })
    setEditMode(false)
  }

  const handleDeletePatient = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este paciente? Esta acción no se puede deshacer.")) {
      const updated = patients.filter((p) => p.id !== id)
      savePatients(updated)
      setSelectedPatient(null)
    }
  }

  const handleAddSession = () => {
    if (!selectedPatient || !sessionData.session) return

    const newSession = {
      date: new Date().toISOString(),
      session: sessionData.session,
      observations: sessionData.observations,
    }

    const updated = patients.map((p) =>
      p.id === selectedPatient.id
        ? { ...p, history: [...(p.history || []), newSession] }
        : p
    )

    savePatients(updated)
    setSelectedPatient({
      ...selectedPatient,
      history: [...(selectedPatient.history || []), newSession],
    })
    setShowAddSession(false)
    setSessionData({ session: "", observations: "" })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      phone: "",
      email: "",
      diagnosis: "",
      notes: "",
    })
  }

  const openPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient)
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      phone: patient.phone,
      email: patient.email,
      diagnosis: patient.diagnosis,
      notes: patient.notes,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pacientes</h2>
          <p className="text-muted-foreground">Gestiona el historial clínico de tus pacientes</p>
        </div>
        <Button 
          onClick={() => {
            resetForm()
            setShowNewPatient(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Pacientes</CardTitle>
          <CardDescription>{filteredPatients.length} paciente(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPatients.length > 0 ? (
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  type="button"
                  onClick={() => openPatientDetails(patient)}
                  className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.phone} • {patient.diagnosis || "Sin diagnóstico"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No se encontraron pacientes</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Patient Modal */}
      {showNewPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowNewPatient(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-border max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowNewPatient(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">Nuevo Paciente</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre Completo *</Label>
                  <Input
                    placeholder="Nombre del paciente"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Edad</Label>
                  <Input
                    type="number"
                    placeholder="Edad"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teléfono *</Label>
                  <Input
                    placeholder="951-000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Diagnóstico</Label>
                <Input
                  placeholder="Diagnóstico inicial"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Notas Iniciales</Label>
                <Textarea
                  placeholder="Observaciones, antecedentes, etc."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNewPatient(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleCreatePatient}
                >
                  Guardar Paciente
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => {
              setSelectedPatient(null)
              setEditMode(false)
            }}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-border max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setSelectedPatient(null)
                setEditMode(false)
              }}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">
                    {selectedPatient.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedPatient.name}</h3>
                  <p className="text-muted-foreground">{selectedPatient.diagnosis || "Sin diagnóstico"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-destructive bg-transparent"
                  onClick={() => handleDeletePatient(selectedPatient.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {editMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Edad</Label>
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Diagnóstico</Label>
                  <Input
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notas</Label>
                  <Textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-transparent"
                    onClick={() => setEditMode(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleUpdatePatient}
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Edad</p>
                      <p className="font-medium text-foreground">{selectedPatient.age} años</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Teléfono</p>
                      <p className="font-medium text-foreground">{selectedPatient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{selectedPatient.email || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Registrado</p>
                      <p className="font-medium text-foreground">
                        {new Date(selectedPatient.createdAt).toLocaleDateString("es-MX")}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedPatient.notes && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium text-foreground">Notas</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedPatient.notes}</p>
                  </div>
                )}

                {/* Clinical History */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground">Historial de Sesiones</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAddSession(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Agregar Sesión
                    </Button>
                  </div>

                  {selectedPatient.history && selectedPatient.history.length > 0 ? (
                    <div className="space-y-3">
                      {selectedPatient.history.slice().reverse().map((session, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-secondary/30 rounded-lg border-l-4 border-primary"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.date).toLocaleDateString("es-MX", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <p className="font-medium text-foreground mb-1">{session.session}</p>
                          {session.observations && (
                            <p className="text-sm text-muted-foreground">{session.observations}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground bg-secondary/30 rounded-lg">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No hay sesiones registradas</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Session Modal */}
      {showAddSession && selectedPatient && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowAddSession(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 border border-border">
            <button
              type="button"
              onClick={() => setShowAddSession(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">Nueva Sesión</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Descripción de la Sesión *</Label>
                <Input
                  placeholder="Ej: Sesión de terapia manual"
                  value={sessionData.session}
                  onChange={(e) => setSessionData({ ...sessionData, session: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Observaciones</Label>
                <Textarea
                  placeholder="Evolución, tratamiento aplicado, recomendaciones..."
                  rows={4}
                  value={sessionData.observations}
                  onChange={(e) => setSessionData({ ...sessionData, observations: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-transparent"
                  onClick={() => setShowAddSession(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleAddSession}
                >
                  Guardar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
