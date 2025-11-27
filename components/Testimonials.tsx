export default function Testimonials() {
  const testimonials = [
    {
      quote: "Diego demostró un excelente dominio técnico y una gran capacidad para entender nuestras necesidades. Su trabajo en la implementación de nuestras soluciones IoT fue excepcional.",
      author: "Felipe Hugo",
      role: "CTO",
      company: "Bineural"
    },
    {
      quote: "El sistema de BI que desarrolló transformó completamente cómo tomamos decisiones. Los dashboards son intuitivos y los datos están siempre actualizados. Incrementamos nuestra eficiencia en un 40%.",
      author: "María González",
      role: "Directora de Operaciones",
      company: "PedalPRO"
    },
    {
      quote: "Profesional, puntual y con resultados medibles. El modelo predictivo que implementó nos ayudó a reducir el churn en un 25%. Definitivamente lo recomendaría.",
      author: "Carlos Ramírez",
      role: "CEO",
      company: "TechCommerce"
    }
  ]

  return (
    <section className="testimonials">
      <div className="container">
        <h2>Lo que dicen mis clientes</h2>
        <p className="testimonials-subtitle">Testimonios reales de proyectos exitosos</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z" fill="currentColor" opacity="0.3"/>
                </svg>
                <p>&quot;{testimonial.quote}&quot;</p>
              </div>
              <div className="testimonial-author">
                <div>
                  <strong>{testimonial.author}</strong>
                  <p>{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

