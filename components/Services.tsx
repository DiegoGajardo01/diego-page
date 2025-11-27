export default function Services() {
  const services = [
    {
      icon: '📊',
      title: 'Business Intelligence',
      description: 'Diseño e implementación de soluciones BI completas. ETL, data warehousing y dashboards interactivos para toma de decisiones basada en datos.',
      features: ['Power BI & Tableau', 'ETL con Pentaho', 'Análisis predictivo', 'KPIs personalizados']
    },
    {
      icon: '🤖',
      title: 'Machine Learning',
      description: 'Desarrollo de modelos predictivos y algoritmos de ML para automatizar procesos y generar insights accionables.',
      features: ['Modelos predictivos', 'Análisis de churn', 'Clasificación de imágenes', 'NLP y chatbots']
    },
    {
      icon: '📈',
      title: 'Análisis de Datos',
      description: 'Transformación de datos en insights estratégicos. Análisis exploratorio, visualizaciones y reportes ejecutivos.',
      features: ['Análisis exploratorio', 'Visualizaciones', 'Reportes ejecutivos', 'Data mining']
    }
  ]

  return (
    <section className="services" id="services">
      <div className="container">
        <h2>Servicios</h2>
        <p className="services-subtitle">Soluciones completas para transformar tus datos en ventajas competitivas</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

