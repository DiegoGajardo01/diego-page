'use client'

import { useEffect, useRef } from 'react'
import { Project } from '@/lib/projects'
import Image from 'next/image'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleTabKey)
      closeButtonRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)
      if (!isOpen && previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className={`modal ${isOpen ? 'show' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeButtonRef}
          className="close-modal"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <div className="modal-header">
          <h3 id="modal-title">{project.title}</h3>
        </div>
        <div className="modal-body">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              width={900}
              height={500}
            />
          )}
          <div className="modal-tech">
            {project.tech.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
          <div className="modal-description">
            {project.fullDescription || project.description}
          </div>
          <div className="modal-links">
            {project.demoLink !== '#' && (
              <a href={project.demoLink} className="modal-link" target="_blank" rel="noopener noreferrer">
                Ver Demo
              </a>
            )}
            {project.repoLink !== '#' && (
              <a href={project.repoLink} className="modal-link" target="_blank" rel="noopener noreferrer">
                Ver Repositorio
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
