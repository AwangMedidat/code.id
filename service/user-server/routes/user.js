const router = require('express').Router()
const UserController = require('../controller/userConttroller')

router.get('/',UserController.getAllUser)
router.get('/find',UserController.getIdentity)
router.post('/',UserController.createUser)
router.get('/look',UserController.getAccount)
router.get('/:id',UserController.getOneUser)
router.put('/:id',UserController.updateUser)
router.delete('/:id',UserController.deleteUser)

module.exports = router