'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseCarouselOptions {
  totalItems: number
  mobileBreakpoint?: number
  autoplay?: boolean
  autoplayInterval?: number
  infinite?: boolean
}

export function useCarousel({
  totalItems,
  mobileBreakpoint = 992,
  autoplay = true,
  autoplayInterval = 5000,
  infinite = true
}: UseCarouselOptions) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const totalPages = Math.ceil(totalItems / itemsPerView)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth > mobileBreakpoint ? 3 : 1)
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [mobileBreakpoint])

  const updateCurrentSlide = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cards = carousel.querySelectorAll('[data-carousel-item]')
    if (cards.length === 0) return

    const cardWidth = (cards[0] as HTMLElement).offsetWidth
    const gap = 10
    const scrollLeft = carousel.scrollLeft
    const containerWidth = carousel.offsetWidth

    let newSlide: number
    if (window.innerWidth <= mobileBreakpoint) {
      newSlide = Math.round(scrollLeft / (cardWidth + gap))
    } else {
      const cardsPerPage = itemsPerView
      newSlide = Math.round((scrollLeft + containerWidth / 2) / (cardWidth + gap) / cardsPerPage)
    }

    newSlide = Math.max(0, Math.min(newSlide, totalPages - 1))

    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide)
    }
  }, [currentSlide, itemsPerView, totalPages, mobileBreakpoint])

  const goToSlide = useCallback((index: number) => {
    let targetIndex = index

    if (infinite) {
      if (index < 0) targetIndex = totalPages - 1
      if (index >= totalPages) targetIndex = 0
    } else {
      if (index < 0) targetIndex = 0
      if (index >= totalPages) targetIndex = totalPages - 1
    }

    const carousel = carouselRef.current
    if (!carousel) return

    const cards = carousel.querySelectorAll('[data-carousel-item]')
    if (cards.length === 0) return

    const cardWidth = (cards[0] as HTMLElement).offsetWidth
    const gap = 10

    let scrollPosition: number
    if (window.innerWidth <= mobileBreakpoint) {
      scrollPosition = targetIndex * (cardWidth + gap)
    } else {
      const cardsPerPage = itemsPerView
      scrollPosition = targetIndex * (cardWidth + gap) * cardsPerPage
    }

    isScrollingRef.current = true
    carousel.scrollTo({
      left: scrollPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })

    setCurrentSlide(targetIndex)

    setTimeout(() => {
      isScrollingRef.current = false
    }, prefersReducedMotion ? 100 : 500)
  }, [itemsPerView, totalPages, mobileBreakpoint, infinite, prefersReducedMotion])

  const goNext = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        updateCurrentSlide()
      }
    }

    carousel.addEventListener('scroll', handleScroll, { passive: true })
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [updateCurrentSlide])

  useEffect(() => {
    if (!autoplay || isPaused || prefersReducedMotion) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
      return
    }

    autoplayTimerRef.current = setInterval(() => {
      goNext()
    }, autoplayInterval)

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [autoplay, isPaused, autoplayInterval, goNext, prefersReducedMotion])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDown = false
    let startX: number
    let scrollLeft: number
    let hasMoved = false
    let clickTarget: HTMLElement | null = null

    const snapToNearestCard = () => {
      const cards = carousel.querySelectorAll('[data-carousel-item]')
      if (cards.length === 0) return

      const cardWidth = (cards[0] as HTMLElement).offsetWidth
      const gap = 10
      const scrollPosition = carousel.scrollLeft
      const containerWidth = carousel.offsetWidth

      let nearestIndex: number
      if (window.innerWidth <= mobileBreakpoint) {
        nearestIndex = Math.round(scrollPosition / (cardWidth + gap))
      } else {
        const cardsPerPage = itemsPerView
        nearestIndex = Math.round((scrollPosition + containerWidth / 2) / (cardWidth + gap) / cardsPerPage)
      }

      nearestIndex = Math.max(0, Math.min(nearestIndex, totalPages - 1))
      goToSlide(nearestIndex)
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      hasMoved = false
      carousel.classList.add('active')
      startX = e.pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      clickTarget = e.target as HTMLElement
      e.preventDefault()
    }

    const handleMouseLeave = () => {
      if (isDown) {
        isDown = false
        carousel.classList.remove('active')
        if (hasMoved) {
          snapToNearestCard()
        }
      }
    }

    const handleMouseUp = () => {
      if (isDown) {
        isDown = false
        carousel.classList.remove('active')

        if (hasMoved) {
          snapToNearestCard()
        } else {
          const card = clickTarget?.closest('[data-carousel-item]')
          if (card) {
            const event = new CustomEvent('carouselItemClick', {
              detail: { card },
              bubbles: true
            })
            card.dispatchEvent(event)
          }
        }
        clickTarget = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      hasMoved = true
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true
      hasMoved = false
      carousel.classList.add('active')
      startX = e.touches[0].pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
      clickTarget = e.target as HTMLElement
    }

    const handleTouchEnd = () => {
      if (isDown) {
        isDown = false
        carousel.classList.remove('active')
        if (hasMoved) {
          snapToNearestCard()
        } else {
          const card = clickTarget?.closest('[data-carousel-item]')
          if (card) {
            const event = new CustomEvent('carouselItemClick', {
              detail: { card },
              bubbles: true
            })
            card.dispatchEvent(event)
          }
        }
        clickTarget = null
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      hasMoved = true
      const x = e.touches[0].pageX - carousel.offsetLeft
      const walk = (x - startX) * 1.5
      carousel.scrollLeft = scrollLeft - walk
      e.preventDefault()
    }

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false })
    carousel.addEventListener('touchend', handleTouchEnd, { passive: false })
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
      carousel.removeEventListener('touchstart', handleTouchStart)
      carousel.removeEventListener('touchend', handleTouchEnd)
      carousel.removeEventListener('touchmove', handleTouchMove)
    }
  }, [itemsPerView, totalPages, goToSlide, mobileBreakpoint])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  return {
    carouselRef,
    currentSlide,
    totalPages,
    goToSlide,
    goNext,
    goPrev,
    isAtStart: !infinite && currentSlide === 0,
    isAtEnd: !infinite && currentSlide >= totalPages - 1,
    pause,
    resume,
    progress: ((currentSlide + 1) / totalPages) * 100
  }
}
