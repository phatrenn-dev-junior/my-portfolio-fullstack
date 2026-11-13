require('dotenv').config()
const app = require('./src/app')
const sequelize = require('./src/config/database')

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await sequelize.authenticate()
    console.log('PostgreSQL connected')

    await sequelize.sync()
    console.log('Database synced')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    const cause = error.original || error.parent || error
    console.error('Unable to connect to the database')
    console.error('Error name:', error.name)
    console.error('Error code:', cause.code || cause.errors?.[0]?.code)
    console.error('Reason:', cause.message || cause.errors?.[0]?.message || '(empty)')
    console.error('DATABASE_URL is set:', Boolean(process.env.DATABASE_URL))
    process.exit(1)
  }
}

start()
