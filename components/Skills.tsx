import Image from 'next/image'

const skills = [
  { name: 'Python', icon: '/media/icons/python.png' },
  { name: 'Django', icon: '/media/icons/django.png' },
  { name: 'MySQL', icon: '/media/icons/mysql.png' },
  { name: 'MongoDB', icon: '/media/icons/mongodb.png' },
  { name: 'Pentaho', icon: '/media/icons/pentaho.png' },
  { name: 'KNIME', icon: '/media/icons/knime.png' },
  { name: 'PowerBI', icon: '/media/icons/powerbi.png' },
  { name: 'Tableau', icon: '/media/icons/tableau.png' },
  { name: 'Excel', icon: '/media/icons/excel.png' },
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <h2>Herramientas</h2>
        <p>Tecnologías con las que he trabajado.</p>
        <div className="grid">
          {skills.map((skill, index) => (
            <div key={index} className="tool">
              <div className="tool-container">
                <Image 
                  src={skill.icon} 
                  alt={skill.name}
                  width={60}
                  height={60}
                />
                <span>{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

