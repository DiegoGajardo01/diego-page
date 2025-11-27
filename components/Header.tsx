'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">DIEGO GAJARDO.</div>
          <div 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-haspopup="true"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link href="#about" onClick={closeMenu} aria-label="Ir a Sobre Mí">
              Sobre Mí
            </Link>
            <Link href="#services" onClick={closeMenu} aria-label="Ir a Servicios">
              Servicios
            </Link>
            <Link href="#projects" onClick={closeMenu} aria-label="Ir a Proyectos">
              Proyectos
            </Link>
            <Link href="#skills" onClick={closeMenu} aria-label="Ir a Habilidades">
              Habilidades
            </Link>
            <Link href="#contact" onClick={closeMenu} aria-label="Ir a Contacto">
              Contacto
            </Link>
          </div>
          <div 
            className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
            onClick={closeMenu}
          ></div>
        </nav>
      </div>
    </header>
  )
}

