import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 text-center">
      <h1 className="text-6xl font-bold text-sky-400 mb-4">404</h1>
      <p className="text-slate-400 text-lg mb-8">This page does not exist.</p>
      <Link
        to="/"
        className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors"
      >
        Back to Home
      </Link>
    </section>
  )
}

export default NotFound