'use client'

import { lazy, Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'

const Projects = lazy(() => import('@/components/Projects'))
const Process = lazy(() => import('@/components/Process'))
const Skills = lazy(() => import('@/components/Skills'))
const Testimonials = lazy(() => import('@/components/Testimonials'))
const Footer = lazy(() => import('@/components/Footer'))

function SectionLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      opacity: 0.5
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 255, 255, 0.1)',
        borderTopColor: '#ffffff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </>
  )
}
