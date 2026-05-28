'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { projects } from '@/lib/projects'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectsPerView, setProjectsPerView] = useState(3)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const updateProjectsPerView = () => {
      setProjectsPerView(window.innerWidth > 992 ? 3 : 1)
    }
    
    updateProjectsPerView()
    window.addEventListener('resize', updateProjectsPerView)
    return () => window.removeEventListener('resize', updateProjectsPerView)
  }, [])

  const totalPages = Math.ceil(projects.length / projectsPerView)

  // Función mejorada para calcular el slide actual basado en el scroll
  const updateCurrentSlide = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cards = carousel.querySelectorAll('.project-card')
    if (cards.length === 0) return

    const cardWidth = (cards[0] as HTMLElement).offsetWidth
    const gap = 10
    const scrollLeft = carousel.scrollLeft
    const containerWidth = carousel.offsetWidth

    let newSlide: number
    if (window.innerWidth <= 992) {
      // Móvil: una tarjeta a la vez
      newSlide = Math.round(scrollLeft / (cardWidth + gap))
    } else {
      // Desktop: múltiples tarjetas
      const cardsPerPage = projectsPerView
      newSlide = Math.round((scrollLeft + containerWidth / 2) / (cardWidth + gap) / cardsPerPage)
    }

    // Asegurar que el slide esté dentro de los límites
    newSlide = Math.max(0, Math.min(newSlide, totalPages - 1))
    
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide)
    }
  }, [currentSlide, projectsPerView, totalPages])

  const goToSlide = useCallback((index: number) => {
    if (index < 0) index = 0
    if (index >= totalPages) index = totalPages - 1
    
    const carousel = carouselRef.current
    if (!carousel) return

    const cards = carousel.querySelectorAll('.project-card')
    if (cards.length === 0) return

    const cardWidth = (cards[0] as HTMLElement).offsetWidth
    const gap = 10
    const containerWidth = carousel.offsetWidth

    let scrollPosition: number
    if (window.innerWidth <= 992) {
      scrollPosition = index * (cardWidth + gap)
    } else {
      const cardsPerPage = projectsPerView
      scrollPosition = index * (cardWidth + gap) * cardsPerPage
    }

    isScrollingRef.current = true
    carousel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })

    setCurrentSlide(index)

    // Resetear flag después de la animación
    setTimeout(() => {
      isScrollingRef.current = false
    }, 500)
  }, [projectsPerView, totalPages])

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }

  // Sincronizar dots cuando se hace scroll manual
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        updateCurrentSlide()
      }
    }

    carousel.addEventListener('scroll', handleScroll, { passive: true })
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [updateCurrentSlide])

  // Drag scroll functionality mejorado
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDown = false
    let startX: number
    let scrollLeft: number
    let hasMoved = false
    let clickTarget: HTMLElement | null = null

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      hasMoved = false
      carousel.classList.add('active')
      startX = e.pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      clickTarget = e.target as HTMLElement
      e.preventDefault()
    }

    const handleMouseLeave = () => {
      if (isDown) {
        isDown = false
        carousel.classList.remove('active')
        if (hasMoved) {
          snapToNearestCard()
        }
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (isDown) {
        isDown = false
        carousel.classList.remove('active')
        
        if (hasMoved) {
          snapToNearestCard()
        } else {
          // Solo abrir modal si no hubo movimiento y el click fue en la card
          const card = clickTarget?.closest('.project-card')
          if (card) {
            const projectId = parseInt(card.getAttribute('data-project-id') || '0')
            const project = projects.find(p => p.id === projectId)
            if (project) {
              openModal(project)
            }
          }
        }
        clickTarget = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      hasMoved = true
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true
      hasMoved = false
      carousel.classList.add('active')
      startX = e.touches[0].pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      clickTarget = e.target as HTMLElement
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDown) {
        isDown = false
        carousel.classList.remove('active')
        if (hasMoved) {
          snapToNearestCard()
        } else {
          const card = clickTarget?.closest('.project-card')
          if (card) {
            const projectId = parseInt(card.getAttribute('data-project-id') || '0')
            const project = projects.find(p => p.id === projectId)
            if (project) {
              openModal(project)
            }
          }
        }
        clickTarget = null
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      hasMoved = true
      const x = e.touches[0].pageX - carousel.offsetLeft
      const walk = (x - startX) * 1.5
      carousel.scrollLeft = scrollLeft - walk
      e.preventDefault()
    }

    const snapToNearestCard = () => {
      const cards = carousel.querySelectorAll('.project-card')
      if (cards.length === 0) return
      
      const cardWidth = (cards[0] as HTMLElement).offsetWidth
      const gap = 10
      const scrollPosition = carousel.scrollLeft
      const containerWidth = carousel.offsetWidth
      
      let nearestIndex: number
      if (window.innerWidth <= 992) {
        nearestIndex = Math.round(scrollPosition / (cardWidth + gap))
      } else {
        const cardsPerPage = projectsPerView
        nearestIndex = Math.round((scrollPosition + containerWidth / 2) / (cardWidth + gap) / cardsPerPage)
      }
      
      // Asegurar que esté dentro de los límites
      nearestIndex = Math.max(0, Math.min(nearestIndex, totalPages - 1))
      goToSlide(nearestIndex)
    }

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false })
    carousel.addEventListener('touchend', handleTouchEnd, { passive: false })
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
      carousel.removeEventListener('touchstart', handleTouchStart)
      carousel.removeEventListener('touchend', handleTouchEnd)
      carousel.removeEventListener('touchmove', handleTouchMove)
    }
  }, [projectsPerView, totalPages, goToSlide])

  return (
    <>
      <section id="projects" className="projects">
        <div className="container">
          <h2>Proyectos</h2>
          <div className="projects-container">
            <div className="projects-carousel-wrapper">
              <div className="projects-carousel" ref={carouselRef}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="project-card"
                    data-project-id={project.id}
                  >
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <span className="project-link">Ver detalles</span>
                  </div>
                ))}
              </div>
              <div className="carousel-arrows">
                <button
                  className={`carousel-arrow carousel-arrow-prev ${currentSlide === 0 ? 'disabled' : ''}`}
                  onClick={() => goToSlide(currentSlide - 1)}
                  disabled={currentSlide === 0}
                  aria-label="Proyecto anterior"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="10,3 5,8 10,13" />
                  </svg>
                </button>
                <button
                  className={`carousel-arrow carousel-arrow-next ${currentSlide >= totalPages - 1 ? 'disabled' : ''}`}
                  onClick={() => goToSlide(currentSlide + 1)}
                  disabled={currentSlide >= totalPages - 1}
                  aria-label="Siguiente proyecto"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6,3 11,8 6,13" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="carousel-dots">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  )
}
