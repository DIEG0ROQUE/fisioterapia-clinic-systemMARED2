"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react"

interface HeaderProps {
  onLoginClick: () => void
  currentUser: { name: string; role: string } | null
  onDashboardClick: () => void
  onLogout: () => void
}

export default function Header({ onLoginClick, currentUser, onDashboardClick, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Agendar Cita", href: "#agendar" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">MARED</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{currentUser.name}</span>
                </div>
                <Button onClick={onDashboardClick} variant="outline" size="sm">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Panel
                </Button>
                <Button onClick={onLogout} variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={onLoginClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-border mt-2">
                {currentUser ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{currentUser.name}</span>
                    </div>
                    <Button onClick={() => { onDashboardClick(); setIsMenuOpen(false); }} variant="outline" size="sm" className="w-full">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Panel de Control
                    </Button>
                    <Button onClick={() => { onLogout(); setIsMenuOpen(false); }} variant="ghost" size="sm" className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => { onLoginClick(); setIsMenuOpen(false); }} 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Iniciar Sesión
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
