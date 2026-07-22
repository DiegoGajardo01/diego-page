export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Diego Gajardo',
    url: 'https://www.diegogajardo.com',
    image: 'https://diegogajardo.com/media/profile200x200.png',
    jobTitle: 'Ingeniero en Informática',
    description: 'Especializado en desarrollo de software, Business Intelligence y Machine Learning',
    sameAs: [
      'https://www.linkedin.com/in/diego-gajardo1/'
    ],
    knowsAbout: [
      'Business Intelligence',
      'Machine Learning',
      'Análisis de Datos',
      'Python',
      'Power BI',
      'Tableau',
      'SQL',
      'ETL'
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portafolio de Diego Gajardo',
    url: 'https://www.diegogajardo.com',
    description: 'Servicios de análisis de datos, ciencia de datos, análisis de negocio e inteligencia de negocios',
    inLanguage: 'es'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
