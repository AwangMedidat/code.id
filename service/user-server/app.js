const express = require('express')
const app = express()
const PORT = process.env.PORT || 4001
const {connect} = require('./config/mongodb')
const router = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended : true}))


connect().then(async(db) => {
  app.use(router)
  app.listen(PORT, () => console.log('App Run On', PORT))
})
