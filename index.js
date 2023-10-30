require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router/index')

app.use('/api', router)
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('server up and running on PORT :', port)
})
