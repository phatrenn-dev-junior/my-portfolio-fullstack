import { useState } from 'react'
import { fetchMessages } from '../services/adminService'

function Admin() {
  const [key, setKey] = useState('')
  const [messages, setMessages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await fetchMessages(key.trim())
      setMessages(data)
    } catch (err) {
      setMessages(null)
      if (err.response?.status === 401) {
        setError('Wrong admin key.')
      } else {
        setError('Cannot reach the server. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setMessages(null)
    setKey('')
  }

  return (
    <section className="min-h-screen px-4 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Admin <span className="text-sky-400">Messages</span>
        </h1>

        {/* Login form */}
        {messages === null && (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Admin key"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="w-full px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'View Messages'}
            </button>
            {error && <p className="text-red-400 text-center">{error}</p>}
          </form>
        )}

        {/* Messages list */}
        {messages !== null && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400">{messages.length} message(s)</p>
              <button
                onClick={handleLogout}
                className="text-sky-400 hover:underline text-sm"
              >
                Log out
              </button>
            </div>

            {messages.length === 0 ? (
              <p className="text-slate-400 text-center">No messages yet.</p>
            ) : (
              <ul className="space-y-4">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(m.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sky-400 text-sm mb-3">{m.email}</p>
                    <p className="text-slate-300 whitespace-pre-wrap">{m.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Admin