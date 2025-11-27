import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <h1>Creando un Futuro Digital.</h1>
          <p>Ingeniero en Informática especializado en desarrollo de software, Business Intelligence y Machine Learning. Transformando datos en soluciones para impulsar negocios y mejorar experiencias.</p>
          <Link href="#contact" className="contact-button">Contactarme</Link>
        </div>
        <div className="hero-image">
          <Image 
            src="/media/profile200x200.png" 
            alt="Diego Gajardo"
            width={200}
            height={200}
            priority
          />
        </div>
      </div>
    </section>
  )
}

