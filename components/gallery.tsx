"use client"

import { useState } from "react"
import { X } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    title: "Sala de Rehabilitación",
    description: "Espacio amplio equipado para ejercicios de rehabilitación",
    color: "from-primary/20 to-primary/10",
  },
  {
    id: 2,
    title: "Área de Terapia Manual",
    description: "Camillas profesionales para tratamientos manuales",
    color: "from-primary/15 to-primary/5",
  },
  {
    id: 3,
    title: "Equipos de Electroterapia",
    description: "Tecnología de última generación",
    color: "from-primary/25 to-primary/10",
  },
  {
    id: 4,
    title: "Recepción",
    description: "Área de bienvenida cómoda y acogedora",
    color: "from-primary/10 to-primary/5",
  },
  {
    id: 5,
    title: "Sala de Espera",
    description: "Ambiente tranquilo para nuestros pacientes",
    color: "from-primary/20 to-primary/15",
  },
  {
    id: 6,
    title: "Consultorio",
    description: "Espacio privado para evaluaciones",
    color: "from-primary/15 to-primary/10",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  return (
    <section id="galeria" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Nuestras Instalaciones
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Conoce nuestro espacio
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Contamos con instalaciones modernas y equipadas para brindarte la mejor atención.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} aspect-square cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-primary transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-4xl w-full aspect-video bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center p-8">
              <svg className="w-24 h-24 text-primary/40 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <h3 className="text-2xl font-bold text-foreground mb-2">{selectedImage.title}</h3>
              <p className="text-muted-foreground">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
