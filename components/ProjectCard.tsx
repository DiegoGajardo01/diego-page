import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="project-card"
      data-carousel-item
      data-project-id={project.id}
      onClick={() => onClick(project)}
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
  )
}
