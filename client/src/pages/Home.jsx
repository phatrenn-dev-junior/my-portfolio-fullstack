import { Link } from 'react-router-dom'
import { aboutData } from '../data/about'
import { homeData } from '../data/home'
import { projects } from '../data/projects'
import DevCharacter from '../components/common/DevCharacter'
import TypeWriter from '../components/common/TypeWriter'
import Reveal from '../components/common/Reveal'

const { name, openToWork } = aboutData
const { roles, intro, techStack } = homeData

// Split the name into letters so each one can be animated.
// The last letter is where the character sits.
const chars = name.split('')
const glyphCount = chars.filter((c) => c !== ' ').length
let glyphIndex = 0
const letters = chars.map((char, i) =>
  char === ' '
    ? { char, i, space: true }
    : { char, i, space: false, glyph: glyphIndex++, last: i === chars.length - 1 }
)

// One shared gradient across the whole name, sliced per letter
const letterStyle = (l) => ({
  backgroundSize: `${glyphCount * 100}% 100%`,
  backgroundPosition: `${glyphCount > 1 ? (l.glyph / (glyphCount - 1)) * 100 : 0}% 0`,
  animationDelay: `${l.i * 70}ms, 0s`,
})

// Featured projects first, then the rest. Show up to 3.
const topProjects = [...projects]
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .slice(0, 3)

function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-112 h-112 rounded-full bg-sky-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-24 w-112 h-112 rounded-full bg-violet-500/20 blur-3xl" />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-3xl text-center">
          {openToWork && (
            <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sm text-green-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Open to work
            </span>
          )}

          <p className="text-sky-400 font-medium mb-3">Hello, I'm</p>

          <h1
            aria-label={name}
            className="relative isolate text-5xl md:text-7xl font-bold mb-4"
          >
            {/* soft glow behind the name */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-12 -translate-y-1/2 bg-linear-to-r from-sky-500/30 via-violet-500/30 to-pink-500/30 blur-3xl"
            />

            {letters.map((l) =>
              l.space ? (
                <span key={l.i} aria-hidden="true" className="inline-block w-[0.28em]" />
              ) : l.last ? (
                <span key={l.i} className="relative inline-block">
                  <span aria-hidden="true" className="name-letter" style={letterStyle(l)}>
                    {l.char}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 w-24 md:w-32 pointer-events-none"
                    style={{ bottom: 'calc(100% - 0.36em)' }}
                  >
                    <DevCharacter />
                  </span>
                </span>
              ) : (
                <span key={l.i} aria-hidden="true" className="name-letter" style={letterStyle(l)}>
                  {l.char}
                </span>
              )
            )}
          </h1>

          <h2 className="text-2xl md:text-3xl text-slate-400 mb-6 min-h-10">
            <TypeWriter
              words={roles}
              className="bg-linear-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent"
            />
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">{intro}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors"
            >
              View My Work
            </Link>
            <a
              href="../../public/Phat-Ren-CV.pdf"
              download
              className="px-8 py-3 rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500/10 font-semibold transition-colors"
            >
              Download CV
            </a>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-lg text-slate-300 hover:text-sky-400 font-semibold transition-colors"
            >
              Contact Me →
            </Link>
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <section aria-label="Technologies I use" className="relative border-y border-slate-800 py-6 overflow-hidden">
        <div className="marquee flex w-max gap-4">
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="shrink-0 px-5 py-2 rounded-full bg-slate-800/60 border border-slate-700 text-sky-400 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="relative max-w-5xl mx-auto px-4 py-24">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Featured{' '}
            <span className="bg-linear-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-slate-400 text-center mb-12">A few things I have built recently.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100} className="h-full">
              <Link
                to="/projects"
                className="group block h-full bg-slate-800/60 backdrop-blur border border-slate-700 hover:border-sky-500 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-slate-900 text-sky-400 text-xs border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-10">
          <Link to="/projects" className="text-sky-400 hover:underline font-medium">
            See all projects →
          </Link>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="relative max-w-3xl mx-auto px-4 pb-24">
        <Reveal>
          <div className="rounded-3xl border border-sky-500/40 bg-linear-to-br from-sky-500/10 to-violet-500/10 p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Looking for a developer to join your team?
            </h2>
            <p className="text-slate-400 mb-8">
              I'm ready to contribute, learn fast and grow with you.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors"
            >
              Let's Talk
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default Home