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
    console.error('Database connection error:', err)
  } else {
    console.log('Connected to MySQL database')
  }
})

router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Query execution error:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while fetching products' })
    } else {
      res.json(results)
    }
  })
})
router.get('/products/id/:id', (req, res) => {
  const productId = req.params.id
  db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId],
    (error, results) => {
      if (error) {
        console.error('Query execution error:', error)
        res
          .status(500)
          .json({ error: 'An error occurred while fetching the product' })
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' })
      } else {
        res.json(results[0])
      }
    }
  )
})

router.get('/products/sort', (req, res) => {
  const category = req.query.category
  const priceDirection = req.query.price
  let sql = 'SELECT * FROM products'

  if (category && priceDirection) {
    sql += ` WHERE category = '${category}' ORDER BY price ${
      priceDirection === 'asc' ? 'ASC' : 'DESC'
    }`
  } else if (category) {
    sql += ` WHERE category = '${category}'`
  } else if (priceDirection) {
    sql += ` ORDER BY price ${priceDirection === 'asc' ? 'ASC' : 'DESC'}`
  }

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Query execution error:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while fetching products' })
    } else {
      res.json(results)
    }
  })
})

router.get('/products/search', (req, res) => {
  const searchTitle = req.query.title
  if (!searchTitle) {
    return res.status(400).json({ error: 'Title parameter is required' })
  }

  const sql = 'SELECT * FROM products WHERE LOWER(title) LIKE ?'

  db.query(sql, [`%${searchTitle.toLowerCase()}%`], (error, results) => {
    if (error) {
      console.error('Query execution error:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while searching for products' })
    } else {
      res.json(results)
    }
  })
})

module.exports = router
