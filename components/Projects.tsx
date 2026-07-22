'use client'

import { useState } from 'react'
import { projects, Project } from '@/lib/projects'
import { useCarousel } from '@/hooks/useCarousel'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import CarouselControls from './CarouselControls'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    carouselRef,
    currentSlide,
    totalPages,
    goToSlide,
    isAtStart,
    isAtEnd
  } = useCarousel({ totalItems: projects.length })

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <section id="projects" className="projects">
        <div className="container">
          <h2>Proyectos</h2>
          <div className="projects-container">
            <div className="projects-carousel-wrapper">
              <div className="projects-carousel" ref={carouselRef}>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={openModal}
                  />
                ))}
              </div>
              <CarouselControls
                currentSlide={currentSlide}
                totalPages={totalPages}
                isAtStart={isAtStart}
                isAtEnd={isAtEnd}
                onPrev={() => goToSlide(currentSlide - 1)}
                onNext={() => goToSlide(currentSlide + 1)}
                onGoToSlide={goToSlide}
              />
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
