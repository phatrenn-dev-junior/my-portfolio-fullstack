const { Sequelize } = require('sequelize')

const baseOptions = {
  dialect: 'postgres',
  logging: false,
  pool: { max: 5, min: 0, idle: 10000 },
}

let sequelize

if (process.env.DATABASE_URL) {
  // Hosted database (Supabase): SSL is required
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    ...baseOptions,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  })
} else {
  // Local PostgreSQL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      ...baseOptions,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  )
}

module.exports = sequelize
