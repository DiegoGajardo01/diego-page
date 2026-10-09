'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseCarouselOptions {
  totalItems: number
  mobileBreakpoint?: number
  autoplay?: boolean
  autoplayInterval?: number
  infinite?: boolean
}

function getPageAnchors(carousel: HTMLDivElement, itemsPerView: number, totalPages: number) {
  const cards = carousel.querySelectorAll<HTMLElement>('[data-carousel-item]')
  if (cards.length === 0) return []

  const carouselLeft = carousel.getBoundingClientRect().left
  const maxScroll = carousel.scrollWidth - carousel.clientWidth
  const maxPageStart = Math.max(0, cards.length - itemsPerView)

  return Array.from({ length: totalPages }, (_, pageIndex) => {
    const card = cards[Math.min(pageIndex * itemsPerView, maxPageStart)]
    const cardLeft = card.getBoundingClientRect().left - carouselLeft + carousel.scrollLeft
    return Math.max(0, Math.min(cardLeft, maxScroll))
  })
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

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerView))

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

    const pageAnchors = getPageAnchors(carousel, itemsPerView, totalPages)
    if (pageAnchors.length === 0) return

    const newSlide = pageAnchors.reduce((nearestIndex, anchor, index) =>
      Math.abs(anchor - carousel.scrollLeft) < Math.abs(pageAnchors[nearestIndex] - carousel.scrollLeft)
        ? index
        : nearestIndex,
      0
    )

    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide)
    }
  }, [currentSlide, itemsPerView, totalPages])

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

    const pageAnchors = getPageAnchors(carousel, itemsPerView, totalPages)
    if (pageAnchors.length === 0) return

    const scrollPosition = pageAnchors[targetIndex]

    isScrollingRef.current = true
    carousel.scrollTo({
      left: scrollPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })

    setCurrentSlide(targetIndex)

    setTimeout(() => {
      isScrollingRef.current = false
    }, prefersReducedMotion ? 100 : 500)
  }, [itemsPerView, totalPages, infinite, prefersReducedMotion])

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
      const pageAnchors = getPageAnchors(carousel, itemsPerView, totalPages)
      if (pageAnchors.length === 0) return

      const nearestIndex = pageAnchors.reduce((nearest, anchor, index) =>
        Math.abs(anchor - carousel.scrollLeft) < Math.abs(pageAnchors[nearest] - carousel.scrollLeft)
          ? index
          : nearest,
        0
      )
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

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
    }
  }, [itemsPerView, totalPages, goToSlide])

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
