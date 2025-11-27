export default function Testimonial() {
  return (
    <section className="testimonial">
      <div className="container">
        <div className="testimonial-text">
          <h3>¿Necesitas ayuda con tu próximo proyecto? ¡Contáctame!</h3>
          <a href="mailto:contacto@diegogajardo.com" className="contact-button">Mándame un Mail</a>
        </div>
        <div className="testimonial-card">
          <p>&quot;Diego demostró un excelente dominio técnico y una gran capacidad para entender nuestras necesidades. Su trabajo en la implementación de nuestras soluciones IoT fue excepcional.&quot;</p>
          <div className="testimonial-author">
            <span>Felipe Hugo - CTO Bineural</span>
          </div>
        </div>
      </div>
    </section>
  )
}

