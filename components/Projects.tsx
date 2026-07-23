'use client'

import { useState, useMemo, useEffect } from 'react'
import { projects, Project } from '@/lib/projects'
import { useCarousel } from '@/hooks/useCarousel'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import CarouselControls from './CarouselControls'

const FILTER_CATEGORIES = {
  'Todos': () => true,
  'IA & Machine Learning': (p: Project) =>
    p.tech.some(t => ['TensorFlow', 'Scikit-Learn', 'CNNs', 'YOLO', 'OpenCV', 'OpenAI'].includes(t)),
  'Business Intelligence': (p: Project) =>
    p.tech.some(t => ['Power BI', 'Tableau', 'Pentaho', 'KNIME', 'Excel'].includes(t)),
  'Desarrollo': (p: Project) =>
    p.tech.some(t => ['Django', 'Shopify', 'MCP', 'ElevenLabs'].includes(t))
} as const

type FilterKey = keyof typeof FILTER_CATEGORIES

function ProjectSkeleton() {
  return (
    <div className="project-card project-skeleton" data-carousel-item>
      <div className="project-card-header">
        <div className="skeleton skeleton-number" />
        <div className="skeleton skeleton-category" />
      </div>
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-description" />
      <div className="skeleton skeleton-description-short" />
      <div className="project-tech">
        <div className="skeleton skeleton-tech" />
        <div className="skeleton skeleton-tech" />
        <div className="skeleton skeleton-tech" />
      </div>
      <div className="skeleton skeleton-link" />
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Todos')
  const [isLoading, setIsLoading] = useState(true)

  const filterKeys = Object.keys(FILTER_CATEGORIES) as FilterKey[]

  const filteredProjects = useMemo(() => {
    const filterFn = FILTER_CATEGORIES[activeFilter]
    return projects.filter(filterFn)
  }, [activeFilter])

  const {
    carouselRef,
    currentSlide,
    totalPages,
    goToSlide,
    goNext,
    goPrev,
    isAtStart,
    isAtEnd,
    pause,
    resume,
    progress
  } = useCarousel({
    totalItems: filteredProjects.length,
    autoplay: true,
    infinite: true
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    goToSlide(0)
  }, [activeFilter, goToSlide])

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
      <section id="projects" className="projects" role="region" aria-roledescription="carousel" aria-label="Carrusel de proyectos">
        <div className="container">
          <h2>Proyectos</h2>

          <div className="projects-filters" role="group" aria-label="Filtrar proyectos por categoría">
            {filterKeys.map((key) => (
              <button
                key={key}
                className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
                onClick={() => setActiveFilter(key)}
                aria-pressed={activeFilter === key}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="projects-container">
            <div className="projects-carousel-wrapper" onMouseEnter={pause} onMouseLeave={resume}>
              <div
                className="projects-carousel"
                ref={carouselRef}
                role="group"
                aria-label={`Proyectos, página ${currentSlide + 1} de ${totalPages}`}
                aria-live="polite"
                tabIndex={0}
              >
                {isLoading ? (
                  <>
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                  </>
                ) : (
                  filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onClick={openModal}
                    />
                  ))
                )}
              </div>

              {!isLoading && (
                <CarouselControls
                  currentSlide={currentSlide}
                  totalPages={totalPages}
                  isAtStart={isAtStart}
                  isAtEnd={isAtEnd}
                  onPrev={goPrev}
                  onNext={goNext}
                  onGoToSlide={goToSlide}
                  progress={progress}
                />
              )}
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
