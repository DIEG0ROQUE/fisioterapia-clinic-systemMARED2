"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Clock, MapPin } from "lucide-react"

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px] hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Centro de Rehabilitación Especializado
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Recupera tu{" "}
              <span className="text-primary">bienestar</span>{" "}
              y calidad de vida
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              En MARED ofrecemos tratamientos personalizados de fisioterapia y rehabilitación. 
              Nuestro equipo de profesionales te ayudará a recuperar tu movilidad y eliminar el dolor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
                asChild
              >
                <a href="#agendar">
                  Agendar Cita
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 bg-transparent"
                asChild
              >
                <a href="#servicios">
                  Ver Servicios
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">+500</div>
                <div className="text-sm text-muted-foreground">Pacientes Atendidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Image & Info Cards */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-48 h-48 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-4 top-1/4 bg-card p-4 rounded-2xl shadow-lg border border-border animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Llámanos</div>
                  <div className="font-semibold text-foreground">951 392 6419</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-1/2 bg-card p-4 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Horario</div>
                  <div className="font-semibold text-foreground">Lun - Sáb: 8am - 7pm</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-1/4 bg-card p-4 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ubicación</div>
                  <div className="font-semibold text-foreground">Centro de la Ciudad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
