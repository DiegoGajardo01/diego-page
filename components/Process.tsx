export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Consulta Inicial',
      description: 'Analizamos tus necesidades y objetivos para entender el alcance del proyecto.'
    },
    {
      number: '02',
      title: 'Propuesta',
      description: 'Te presento una propuesta detallada con metodología, timeline y presupuesto.'
    },
    {
      number: '03',
      title: 'Desarrollo',
      description: 'Trabajamos en sprints con entregas regulares y comunicación constante.'
    },
    {
      number: '04',
      title: 'Entrega',
      description: 'Implementación, documentación y capacitación para asegurar el éxito del proyecto.'
    }
  ]

  return (
    <section className="process">
      <div className="container">
        <h2>Mi Proceso de Trabajo</h2>
        <p className="process-subtitle">Un enfoque estructurado que garantiza resultados exitosos</p>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

