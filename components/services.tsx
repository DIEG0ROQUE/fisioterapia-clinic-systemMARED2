"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Brain, Heart, Zap, Bone, Users } from "lucide-react"

const services = [
  {
    icon: Activity,
    title: "Terapia Manual",
    description: "Técnicas especializadas de manipulación y movilización articular para aliviar el dolor y mejorar la función.",
    features: ["Masaje terapéutico", "Movilización articular", "Liberación miofascial"],
  },
  {
    icon: Bone,
    title: "Rehabilitación Física",
    description: "Programas personalizados de ejercicios para recuperar fuerza, flexibilidad y funcionalidad después de lesiones.",
    features: ["Post-operatorio", "Lesiones deportivas", "Fortalecimiento"],
  },
  {
    icon: Brain,
    title: "Neurorehabilitación",
    description: "Tratamientos especializados para condiciones neurológicas que afectan el movimiento y la coordinación.",
    features: ["ACV", "Parkinson", "Esclerosis múltiple"],
  },
  {
    icon: Heart,
    title: "Fisioterapia Cardiopulmonar",
    description: "Rehabilitación respiratoria y cardiovascular para mejorar la capacidad física y calidad de vida.",
    features: ["EPOC", "Post-infarto", "Ejercicio terapéutico"],
  },
  {
    icon: Zap,
    title: "Electroterapia",
    description: "Uso de corrientes eléctricas terapéuticas para aliviar el dolor y estimular la recuperación muscular.",
    features: ["TENS", "Ultrasonido", "Laser terapéutico"],
  },
  {
    icon: Users,
    title: "Fisioterapia Geriátrica",
    description: "Atención especializada para adultos mayores, enfocada en mantener la independencia y prevenir caídas.",
    features: ["Equilibrio", "Movilidad", "Prevención de caídas"],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Nuestros Servicios
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Tratamientos especializados para tu recuperación
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ofrecemos una amplia gama de servicios de fisioterapia adaptados a las necesidades específicas de cada paciente.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group bg-card hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
