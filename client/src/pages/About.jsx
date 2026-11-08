import { Link } from 'react-router-dom'
import { aboutData } from '../data/about'
import Reveal from '../components/common/Reveal'
import Counter from '../components/common/Counter'

function About() {
  const { name, role, openToWork, photo, bio, stats, skillGroups, journey } = aboutData

  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20">
      {/* background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 -left-24 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        {/* Hero */}
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <Reveal className="md:col-span-2">
            <div className="relative w-64 md:w-full max-w-xs mx-auto about-float">
              <div className="absolute -inset-3 rounded-3xl bg-linear-to-tr from-sky-500 to-violet-500 opacity-40 blur-2xl" />
              <img
                src={photo}
                alt={name}
                className="relative w-full aspect-square object-cover rounded-3xl border border-slate-700"
              />
              {openToWork && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm text-green-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Open to work
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-3">
            <p className="text-sky-400 font-medium mb-2">About me</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm{' '}
              <span className="bg-linear-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-400 mb-6">{role}</h2>

            {bio.map((text, i) => (
              <p key={i} className="text-slate-400 text-lg mb-4">
                {text}
              </p>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/contact"
                className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-center transition-colors"
              >
                Hire Me
              </Link>
              <a
                href="/cv.pdf"
                download
                className="px-8 py-3 rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500/10 font-semibold text-center transition-colors"
              >
                Download CV
              </a>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-sky-400">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-slate-400 text-sm mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-3xl font-bold mb-10 text-center">
              My <span className="text-sky-400">Skills</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 120}>
                <div className="h-full bg-slate-800/60 border border-slate-700 hover:border-sky-500 rounded-2xl p-6 transition-colors">
                  <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full bg-slate-900 text-sky-400 text-sm border border-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Journey */}
        <div className="mt-24 max-w-2xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-10 text-center">
              My <span className="text-sky-400">Journey</span>
            </h2>
          </Reveal>
          <ol className="border-l-2 border-slate-700 ml-3">
            {journey.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <li className="relative pl-8 pb-10 last:pb-0">
                  <span className="absolute -left-2.25 top-1.5 h-4 w-4 rounded-full bg-sky-500 border-4 border-slate-900" />
                  <p className="text-sky-400 text-sm font-medium">{item.period}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-slate-500 text-sm mb-1">{item.place}</p>
                  <p className="text-slate-400">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Final CTA */}
        <Reveal className="mt-24">
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
      </div>
    </section>
  )
}

export default About