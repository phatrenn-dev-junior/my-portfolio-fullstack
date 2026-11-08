import { useEffect, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'

function Counter({ value, suffix = '' }) {
  const [ref, visible] = useReveal()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCount(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    let frame

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(value * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [visible, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default Counter