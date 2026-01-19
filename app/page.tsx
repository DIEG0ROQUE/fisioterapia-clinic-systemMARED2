"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import AppointmentForm from "@/components/appointment-form"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<{
    name: string
    role: "fisioterapeuta" | "colaborador"
    email: string
  } | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }

    // Initialize demo data
    initializeDemoData()
  }, [])

  const initializeDemoData = () => {
    // Initialize users if not exists
    if (!localStorage.getItem("users")) {
      const defaultUsers = [
        {
          id: "1",
          name: "Dr. María García",
          email: "maria@clinica.com",
          password: "admin123",
          role: "fisioterapeuta",
        },
        {
          id: "2",
          name: "Carlos López",
          email: "carlos@clinica.com",
          password: "colab123",
          role: "colaborador",
        },
      ]
      localStorage.setItem("users", JSON.stringify(defaultUsers))
    }

    // Initialize patients if not exists
    if (!localStorage.getItem("patients")) {
      const defaultPatients = [
        {
          id: "1",
          name: "Juan Pérez",
          age: 45,
          phone: "555-1234",
          email: "juan@email.com",
          diagnosis: "Lumbalgia crónica",
          notes: "Paciente con dolor lumbar de 6 meses de evolución",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Ana Martínez",
          age: 32,
          phone: "555-5678",
          email: "ana@email.com",
          diagnosis: "Tendinitis de hombro",
          notes: "Deportista amateur, lesión por sobreesfuerzo",
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("patients", JSON.stringify(defaultPatients))
    }

    // Initialize appointments if not exists
    if (!localStorage.getItem("appointments")) {
      const today = new Date()
      const defaultAppointments = [
        {
          id: "1",
          patientName: "Juan Pérez",
          patientEmail: "juan@email.com",
          patientPhone: "555-1234",
          date: today.toISOString().split("T")[0],
          time: "10:00",
          therapist: "Dr. María García",
          service: "Terapia Manual",
          status: "confirmada",
          notes: "",
        },
        {
          id: "2",
          patientName: "Ana Martínez",
          patientEmail: "ana@email.com",
          patientPhone: "555-5678",
          date: today.toISOString().split("T")[0],
          time: "11:30",
          therapist: "Dr. María García",
          service: "Rehabilitación",
          status: "pendiente",
          notes: "",
        },
      ]
      localStorage.setItem("appointments", JSON.stringify(defaultAppointments))
    }

    // Initialize finances if not exists
    if (!localStorage.getItem("finances")) {
      const defaultFinances = {
        income: [
          { id: "1", description: "Terapia - Juan Pérez", amount: 800, date: new Date().toISOString(), category: "terapia" },
          { id: "2", description: "Rehabilitación - Ana Martínez", amount: 1200, date: new Date().toISOString(), category: "rehabilitacion" },
        ],
        expenses: [
          { id: "1", description: "Renta mensual", amount: 5000, date: new Date().toISOString(), category: "renta" },
          { id: "2", description: "Luz", amount: 800, date: new Date().toISOString(), category: "luz" },
          { id: "3", description: "Internet", amount: 600, date: new Date().toISOString(), category: "internet" },
        ],
      }
      localStorage.setItem("finances", JSON.stringify(defaultFinances))
    }
  }

  const handleLogin = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password)

    if (user) {
      const userData = { name: user.name, role: user.role, email: user.email }
      setCurrentUser(userData)
      localStorage.setItem("currentUser", JSON.stringify(userData))
      setIsLoginOpen(false)
      setShowDashboard(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    setShowDashboard(false)
  }

  if (showDashboard && currentUser) {
    return (
      <Dashboard
        user={currentUser}
        onLogout={handleLogout}
        onBackToSite={() => setShowDashboard(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onLoginClick={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onDashboardClick={() => setShowDashboard(true)}
        onLogout={handleLogout}
      />
      <main>
        <Hero />
        <Services />
        <About />
        <AppointmentForm />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}
