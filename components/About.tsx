export default function About() {
  const stats = [
    { number: '5+', label: 'Años de experiencia' },
    { number: '20+', label: 'Proyectos completados' },
    { number: '15+', label: 'Clientes satisfechos' },
    { number: '100%', label: 'Comprometido' }
  ]

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Sobre Mí</h2>
            <p>
              Ingeniero en Informática con más de 5 años de experiencia especializado en desarrollo de software, 
              Business Intelligence y Machine Learning. Mi enfoque combina conocimientos técnicos sólidos con una 
              comprensión profunda de las necesidades del negocio.
            </p>
            <p>
              He trabajado con empresas de diversos sectores, ayudándolas a transformar sus datos en decisiones 
              estratégicas y soluciones tecnológicas que generan valor real. Mi objetivo es siempre entender 
              primero el problema del negocio para luego aplicar la mejor solución técnica.
            </p>
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

