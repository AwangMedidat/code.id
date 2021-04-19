const User = require('../models/user')

class UserController {

  static async getAllUser(req,res) {
    try{
      const user = await User.readAllUser()
      res.json(user)
    }catch(err){
      console.log(err)
    }
  }

  static async getIdentity(req,res){
    try{
      console.log(req.query.idt);
      const user = await User.findIdentity(req.query.idt)
      res.json(JSON.parse(JSON.stringify(user)))
    }catch(err){
      console.log(err)
    }
  }

  static async createUser(req,res) {
    try{
      const user = await User.addUser(req.body)
      res.json(user)
    }catch(err){
      console.log(err)
    }
  }

  static async getAccount(req,res){
    try{
      console.log('masukkk')
      console.log(req.query.act);
      const user = await User.findAccount(req.query.act)
      res.json(JSON.parse(JSON.stringify(user)))
    }catch(err){
      console.log(err)
    }
  }
  

  static async getOneUser(req,res){
    try{
      const user = await User.findUserId(req.params.id)
      res.json(user)
    }catch(err){
      console.log(err)
    }
  }

  static async updateUser(req,res) {
    try{
      const user = await User.editUser(req.params.id,req.body)
      res.json(user)
    }catch(err){
      console.log(err)
    }
  }

  static async deleteUser(req,res) {
    try{
      const user = await User.delUser(req.params.id)
      res.json(user)
    }catch(err){
      console.log(err)
    }
  }
}

module.exports = UserController