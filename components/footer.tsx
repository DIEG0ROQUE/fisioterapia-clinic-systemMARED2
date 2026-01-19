"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"

const navigation = {
  services: [
    { name: "Terapia Manual", href: "#servicios" },
    { name: "Rehabilitación", href: "#servicios" },
    { name: "Neurorehabilitación", href: "#servicios" },
    { name: "Electroterapia", href: "#servicios" },
  ],
  company: [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Galería", href: "#galeria" },
    { name: "Contacto", href: "#contacto" },
    { name: "Agendar Cita", href: "#agendar" },
  ],
  social: [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#inicio" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <span className="text-xl font-bold">MARED</span>
            </a>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              Centro especializado en fisioterapia y rehabilitación. Tu salud es nuestra prioridad.
            </p>
            <div className="flex gap-3">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Clínica</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Armenta y Lopez #1026</li>
              <li>Col. Centro, Oaxaca</li>
              <li>951 392 6419</li>
              <li>contacto@MARED.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} MARED. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-primary transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
