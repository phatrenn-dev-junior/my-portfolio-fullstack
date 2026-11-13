require('dotenv').config()
const { QueryTypes } = require('sequelize')
const sequelize = require('./src/config/database')

sequelize
  .query(
    "SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema = 'public'",
    { type: QueryTypes.SELECT }
  )
  .then((rows) => {
    console.log('Rows found:', rows.length)
    console.log(JSON.stringify(rows))
    return sequelize.close()
  })
  .catch((error) => {
    const cause = error.original || error
    console.log('Error code:', cause.code || cause.errors?.[0]?.code)
    console.log('Reason:', cause.message || cause.errors?.[0]?.message || '(empty)')
    process.exit(1)
  })
