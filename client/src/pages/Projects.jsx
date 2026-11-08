import { useState } from 'react'
import { projects } from '../data/projects'
import Reveal from '../components/common/Reveal'

const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))]

const hasLink = (url) => Boolean(url) && url !== '#'

function Projects() {
  const [active, setActive] = useState('All')

  const visible =
    active === 'All' ? projects : projects.filter((p) => p.tags.includes(active))

  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 min-h-screen">
      {/* background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sky-400 font-medium text-center mb-2">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My{' '}
            <span className="bg-linear-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-slate-400 text-center max-w-xl mx-auto mb-10">
            A selection of things I have built. Filter by technology to find what interests you.
          </p>
        </Reveal>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              aria-pressed={active === tag}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === tag
                  ? 'bg-sky-500 border-sky-500 text-slate-950'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={i * 100} className="h-full">
              <article className="group h-full flex flex-col bg-slate-800/60 backdrop-blur border border-slate-700 hover:border-sky-500 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-slate-900 text-sky-400 text-xs border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {hasLink(project.demo) && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline text-sm font-medium"
                      >
                        Live Demo
                      </a>
                    )}
                    {hasLink(project.code) && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-sky-400 text-sm font-medium"
                      >
                        Source Code
                      </a>
                    )}
                    {!hasLink(project.demo) && !hasLink(project.code) && (
                      <span className="text-slate-500 text-sm">Links coming soon</span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects