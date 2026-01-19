"use client"

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    content: "Armenta y Lopez #1026, Col. Centro",
    detail: "Oaxaca, CP 68000",
  },
  {
    icon: Phone,
    title: "Teléfono",
    content: "951 392 6419",
    detail: "Llamadas y WhatsApp",
  },
  {
    icon: Mail,
    title: "Correo",
    content: "contacto@MARED.com",
    detail: "Respuesta en 24 horas",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lunes a Viernes: 8:00 - 19:00",
    detail: "Sábado: 8:00 - 14:00",
  },
]

export default function Contact() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5551234567?text=Hola,%20me%20gustaría%20agendar%20una%20cita", "_blank")
  }

  return (
    <section id="contacto" className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Contáctanos
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Estamos aquí para ayudarte
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Si tienes alguna pregunta o deseas más información sobre nuestros servicios, 
              no dudes en contactarnos. Estamos a tu disposición.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {contactInfo.map((item) => (
                <div 
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-foreground">{item.content}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleWhatsApp}
              size="lg"
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Escríbenos por WhatsApp
            </Button>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Nuestra Ubicación</h3>
                <p className="text-muted-foreground mb-4">
                  Armenta y Lopez #1026, Col. Centro<br />
                  Oaxaca
                </p>
                <Button 
                  variant="outline" 
                  asChild
                >
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Ver en Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
