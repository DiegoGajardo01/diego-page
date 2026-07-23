import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: (project: Project) => void
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0')

  return (
    <div
      className="project-card"
      data-carousel-item
      data-project-id={project.id}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(project)
        }
      }}
      aria-label={`Ver detalles del proyecto: ${project.title}`}
    >
      <div className="project-card-header">
        <span className="project-number">{projectNumber}</span>
        <span className="project-category">{project.category}</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-tech">
        {project.tech.map((tech, idx) => (
          <span key={idx} className="tech-tag">{tech}</span>
        ))}
      </div>
      <span className="project-link">Ver detalles →</span>
    </div>
  )
}
