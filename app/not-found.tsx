import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '120px 20px' }}>
      <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>404</h1>
      <p style={{ opacity: 0.8, marginBottom: '40px' }}>Página no encontrada</p>
      <Link href="/" className="contact-button">Volver al inicio</Link>
    </div>
  )
}
