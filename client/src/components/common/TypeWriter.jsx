import { useEffect, useState } from 'react'

function TypeWriter({ words, className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return

    const word = words[index]
    let delay = deleting ? 40 : 90
    if (!deleting && text === word) delay = 1500
    if (deleting && text === '') delay = 300

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
        )
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, reduceMotion])

  if (reduceMotion) return <span className={className}>{words[0]}</span>

  return (
    <span className={className}>
      {text}
      <span aria-hidden="true" className="type-caret">|</span>
    </span>
  )
}

export default TypeWriter