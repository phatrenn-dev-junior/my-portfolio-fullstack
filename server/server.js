require('dotenv').config()
const app = require('./src/app')
const sequelize = require('./src/config/database')

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Database synced')

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error.message)
    process.exit(1)
  }
}

start()