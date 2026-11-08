import { Link } from 'react-router-dom'
import { aboutData } from '../../data/about'
import { contactData } from '../../data/contact'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

const hasLink = (url) => Boolean(url) && url !== '#'

const initials = aboutData.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

function Footer() {
  const { name, role, openToWork } = aboutData
  const { email, socials } = contactData
  const liveSocials = socials.filter((s) => hasLink(s.url))

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative border-t border-slate-800 bg-slate-900/60">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 group" aria-label={`${name} home`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-violet-500 text-sm font-bold text-white transition-transform group-hover:rotate-6">
                {initials}
              </span>
              <span className="text-lg font-bold text-slate-300 group-hover:text-sky-400 transition-colors">
                {name}
              </span>
            </Link>
            <p className="mt-3 text-slate-400 text-sm">{role}</p>

            {openToWork && (
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-green-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Available for work
              </span>
            )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-sky-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Connect</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-slate-400 hover:text-sky-400 text-sm transition-colors break-all"
                >
                  {email}
                </a>
              </li>
              {liveSocials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-slate-400 hover:text-sky-400 text-sm transition-colors"
                  >
                    {s.label}
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {name}. All rights reserved.
            <span className="block sm:inline sm:ml-2">
              Built with React, Vite &amp; Tailwind CSS.
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer