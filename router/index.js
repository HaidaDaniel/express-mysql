const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err)
  } else {
    console.log('Подключено к базе данных MySQL')
  }
})

router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error)
      res
        .status(500)
        .json({ error: 'Произошла ошибка при получении продуктов' })
    } else {
      res.json(results)
    }
  })
})

module.exports = router
