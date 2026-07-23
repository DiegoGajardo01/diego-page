interface CarouselControlsProps {
  currentSlide: number
  totalPages: number
  isAtStart: boolean
  isAtEnd: boolean
  onPrev: () => void
  onNext: () => void
  onGoToSlide: (index: number) => void
  progress: number
}

export default function CarouselControls({
  currentSlide,
  totalPages,
  isAtStart,
  isAtEnd,
  onPrev,
  onNext,
  onGoToSlide,
  progress
}: CarouselControlsProps) {
  return (
    <>
      <div className="carousel-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso del carrusel">
        <div className="carousel-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="carousel-arrows">
        <button
          className={`carousel-arrow carousel-arrow-prev ${isAtStart ? 'disabled' : ''}`}
          onClick={onPrev}
          disabled={isAtStart}
          aria-label="Proyecto anterior"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10,3 5,8 10,13" />
          </svg>
        </button>
        <button
          className={`carousel-arrow carousel-arrow-next ${isAtEnd ? 'disabled' : ''}`}
          onClick={onNext}
          disabled={isAtEnd}
          aria-label="Siguiente proyecto"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,3 11,8 6,13" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Páginas del carrusel">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onGoToSlide(index)}
            aria-label={`Ir a página ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>
    </>
  )
}
