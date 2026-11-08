import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { aboutData } from '../../data/about'
import ThemeToggle from '../common/ThemeToggle'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

const initials = aboutData.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

const desktopClass = ({ isActive }) =>
  `relative py-1 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-sky-400 after:transition-all after:duration-300 ${
    isActive
      ? 'text-sky-400 after:w-full'
      : 'text-slate-300 hover:text-sky-400 after:w-0 hover:after:w-full'
  }`

const mobileClass = ({ isActive }) =>
  `block py-3 px-2 rounded-lg transition-colors ${
    isActive
      ? 'text-sky-400 bg-sky-500/10'
      : 'text-slate-300 hover:text-sky-400 hover:bg-slate-800'
  }`

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()

  // New page: close the menu and start at the top
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 10)
      setProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
        solid
          ? 'bg-slate-900/85 backdrop-blur-lg border-slate-800 shadow-lg shadow-black/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label={`${aboutData.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-violet-500 text-sm font-bold text-white transition-transform group-hover:rotate-6">
            {initials}
          </span>
          <span className="hidden sm:block text-lg font-bold text-slate-300 group-hover:text-sky-400 transition-colors">
            {aboutData.name}
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={desktopClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:inline-block px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold transition-colors"
          >
            Hire Me
          </Link>

          <ThemeToggle />

          {/* Mobile button */}
          <button
            className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`h-0.5 w-6 rounded bg-slate-300 transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 rounded bg-slate-300 transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 rounded bg-slate-300 transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden nav-drop border-t border-slate-800 bg-slate-900 px-4 py-3">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={mobileClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-3 block text-center px-5 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors"
          >
            Hire Me
          </Link>
        </div>
      )}

      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-sky-400 to-violet-400"
        style={{ width: `${progress}%` }}
      />
    </nav>
  )
}

export default Navbar