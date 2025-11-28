'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API Error:', data)
        const errorMsg = data.error || 'Error al enviar el mensaje'
        setErrorMessage(errorMsg)
        throw new Error(errorMsg)
      }

      setSubmitStatus('success')
      setErrorMessage('')
      setFormData({ name: '', email: '', phone: '', company: '', message: '', service: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      if (!errorMessage) {
        setErrorMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente por email.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>¿Necesitas ayuda con tu proyecto?<br />¡Agenda una reunión!</h2>
        <p>Estoy disponible para colaborar en proyectos de desarrollo, análisis de datos y soluciones de BI. Completa el formulario y te responderé en menos de 24 horas.</p>
        
        <div className="contact-wrapper">
          <div className="contact-form-card">
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
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
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
            {submitStatus === 'error' && (
              <p className="form-error">{errorMessage}</p>
            )}
          </form>
          </div>
          
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

