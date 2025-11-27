'use client'

import { useEffect } from 'react'
import { Project } from '@/lib/projects'
import Image from 'next/image'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h3>{project.title}</h3>
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

