"use client"

import { CheckCircle2, Award, Users, Clock } from "lucide-react"

const features = [
  "Fisioterapeutas certificados",
  "Instalaciones modernas y equipadas",
  "Tratamientos personalizados",
  "Seguimiento continuo de tu evolución",
  "Horarios flexibles",
  "Comunicación directa con tu terapeuta",
]

const stats = [
  { icon: Award, value: "5+", label: "Certificaciones" },
  { icon: Users, value: "2", label: "Especialistas" },
  { icon: Clock, value: "12hrs", label: "Atención diaria" },
]

export default function About() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-32 h-32 text-primary/40 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <p className="text-primary/60 font-medium">Equipo Profesional</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-card rounded-2xl shadow-lg border border-border p-6">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Sobre Nosotros
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Tu salud es nuestra prioridad
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              MARED es un centro de fisioterapia comprometido con la recuperación integral de nuestros pacientes. 
              Contamos con experiencia brindando atención de calidad.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Nuestro equipo está formado por profesionales altamente capacitados que utilizan las técnicas más 
              avanzadas para garantizar los mejores resultados en cada tratamiento.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
