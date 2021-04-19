const router = require('express').Router()
const routerUser = require('./user')


router.use('/users',routerUser)


module.exports = router