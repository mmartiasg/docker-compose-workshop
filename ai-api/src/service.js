//fix
//ER_NOT_SUPPORTED_AUTH_MODE
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'mysql-service',
  user: 'root',
  port: 3306,
  password: 'root',
  // database: 'model'
})

connection.connect()

connection.query('SELECT * FROM model.params tnt', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  console.log(rows[0].tita1)
})

// connection.query('SELECT 1+2 as solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log(fields.solution)
// })

connection.end()