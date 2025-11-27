'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Aquí puedes integrar con un servicio de email o API
    // Por ahora, usamos mailto como fallback
    const mailtoLink = `mailto:contacto@diegogajardo.com?subject=Solicitud de contacto desde portafolio&body=Nombre: ${formData.name}%0AEmail: ${formData.email}%0AEmpresa: ${formData.company}%0AServicio de interés: ${formData.service}%0A%0AMensaje:%0A${formData.message}`
    
    window.location.href = mailtoLink
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '', service: '' })
    }, 1000)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>¿Necesitas ayuda con tu proyecto?<br />¡Agenda una reunión!</h2>
        <p>Estoy disponible para colaborar en proyectos de desarrollo, análisis de datos y soluciones de BI. Completa el formulario y te responderé en menos de 24 horas.</p>
        
        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="service">Servicio de interés</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Selecciona un servicio</option>
                <option value="business-intelligence">Business Intelligence</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="desarrollo-software">Desarrollo de Software</option>
                <option value="analisis-datos">Análisis de Datos</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>
            
            <button 
              type="submit" 
              className="contact-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
            
            {submitStatus === 'success' && (
              <p className="form-success">¡Mensaje enviado! Te responderé pronto.</p>
            )}
          </form>
          
          <div className="contact-info">
            <h3>O contáctame directamente</h3>
            <div className="contact-methods">
              <a href="mailto:contacto@diegogajardo.com" className="contact-method">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>contacto@diegogajardo.com</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/diego-gajardo1/" target="_blank" rel="noopener noreferrer" className="contact-method">
                <span className="contact-icon">💼</span>
                <div>
                  <strong>LinkedIn</strong>
                  <p>Conectemos en LinkedIn</p>
                </div>
              </a>
            </div>
            <div className="response-time">
              <p>⏱️ <strong>Tiempo de respuesta:</strong> Menos de 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

