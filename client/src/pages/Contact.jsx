import { useState } from 'react'
import { contactData } from '../data/contact'
import { sendMessage } from '../services/contactService'
import Reveal from '../components/common/Reveal'

const initialForm = { name: '', email: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Please enter a valid email.'
  if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

const hasLink = (url) => Boolean(url) && url !== '#'

const fieldClass = (hasError) =>
  `w-full px-4 py-3 rounded-lg bg-slate-800 border text-white placeholder-slate-500 focus:outline-none ${
    hasError ? 'border-red-500' : 'border-slate-700 focus:border-sky-500'
  }`

function Contact() {
  const { email, location, availability, replyTime, socials } = contactData

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSent(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const foundErrors = validate(form)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    setSending(true)
    try {
      await sendMessage(form)
      setSent(true)
      setForm(initialForm)
    } catch (error) {
      if (error.response?.status === 429) {
        setServerError('Too many messages. Please try again later.')
      } else if (error.response?.status === 400) {
        setServerError('Some information is invalid. Please check and try again.')
      } else {
        setServerError('Cannot reach the server. Please try again later.')
      }
    } finally {
      setSending(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable: the email link below still works
    }
  }

  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 min-h-screen">
      {/* background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 -left-24 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sky-400 font-medium text-center mb-2">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Let's{' '}
            <span className="bg-linear-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              work together
            </span>
          </h1>
          <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
            Have a role, a project or just a question? Send me a message and I will get back to you.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info column */}
          <Reveal className="md:col-span-2">
            <div className="space-y-4">
              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-6">
                <span className="inline-flex items-center gap-2 text-sm text-green-400 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Available for work
                </span>
                <p className="text-slate-300 mb-1">{availability}</p>
                <p className="text-slate-500 text-sm">{replyTime}</p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-6">
                <p className="text-slate-500 text-sm mb-1">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-sky-400 hover:underline break-all"
                >
                  {email}
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="block mt-3 text-sm text-slate-400 hover:text-sky-400 transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy email'}
                </button>

                <p className="text-slate-500 text-sm mt-5 mb-1">Location</p>
                <p className="text-slate-300">{location}</p>
              </div>

              {socials.some((s) => hasLink(s.url)) && (
                <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-6">
                  <p className="text-slate-500 text-sm mb-3">Find me online</p>
                  <ul className="space-y-3">
                    {socials
                      .filter((s) => hasLink(s.url))
                      .map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between text-slate-300 hover:text-sky-400 transition-colors"
                          >
                            <span>
                              <span className="font-medium">{s.label}</span>
                              <span className="block text-sm text-slate-500">{s.handle}</span>
                            </span>
                            <span className="transition-transform group-hover:translate-x-1">↗</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={150} className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-6 md:p-8 space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm text-slate-400 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass(errors.name)}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-slate-400 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass(errors.email)}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell me about the role or project..."
                  aria-invalid={Boolean(errors.message)}
                  className={fieldClass(errors.message)}
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              {serverError && (
                <p role="alert" className="text-red-400 text-center">
                  {serverError}
                </p>
              )}

              {sent && (
                <p role="status" className="text-green-400 text-center">
                  Thank you! Your message was sent. I will reply soon.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact