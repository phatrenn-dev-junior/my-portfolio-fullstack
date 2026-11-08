const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const healthRoutes = require('./routes/healthRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/contact', contactRoutes)

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

module.exports = app