import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CarouselContext = React.createContext(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error('useCarousel must be used within Carousel')
  return ctx
}

function Carousel({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  )

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('select', onSelect)
    return () => api.off('select', onSelect)
  }, [api, onSelect])

  React.useEffect(() => {
    if (api && setApi) setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, orientation, canScrollPrev, canScrollNext, scrollPrev: () => api?.scrollPrev(), scrollNext: () => api?.scrollNext() }}
    >
      <div className={cn('relative', className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel()
  return (
    <div
      className={cn('min-w-0 shrink-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
      {...props}
    />
  )
}

function CarouselPrevious(props) {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button size="icon" variant="outline" disabled={!canScrollPrev} onClick={scrollPrev} {...props}>
      <ArrowLeft />
    </Button>
  )
}

function CarouselNext(props) {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <Button size="icon" variant="outline" disabled={!canScrollNext} onClick={scrollNext} {...props}>
      <ArrowRight />
    </Button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
