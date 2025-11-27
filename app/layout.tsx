import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Diego Gajardo',
  description: 'Pagina web donde podrás contratar servicios para analisis de datos, ciencia de datos, analisis de negocio, inteligencia de negocios podrás contactarme conmigo y ver mis diferentes proyectos',
  openGraph: {
    url: 'https://www.diegogajardo.com',
    type: 'website',
    title: 'Portafolio de Diego Gajardo',
    description: 'Pagina web donde podrás contratar servicios para analisis de datos, ciencia de datos, analisis de negocio, inteligencia de negocios podrás contactarme conmigo y ver mis diferentes proyectos',
    images: ['https://diegogajardo.com/media/og.jpg'],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'Diego Gajardo',
    creator: 'Diego Gajardo',
    title: 'Portafolio de Diego Gajardo',
    description: 'Pagina web donde podrás contratar servicios para analisis de datos, ciencia de datos, analisis de negocio, inteligencia de negocios podrás contactarme conmigo y ver mis diferentes proyectos',
  },
  icons: {
    icon: '/media/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

