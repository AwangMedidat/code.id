const {getDatabase} = require('../config/mongodb')
const {ObjectId} = require('bson')

class User {

  static async readAllUser() {
      const allUser = await getDatabase().collection('Userdata').find().toArray()
      return allUser
  }

  static async findIdentity(identity){
    const userByIdentity = await getDatabase().collection('Userdata').findOne(
      {identityNumber : identity})
    return userByIdentity
  }
  
  static async addUser(Userdata) {
    const newUser = await getDatabase().collection('Userdata').insertOne(Userdata)
    return newUser
  }
  
  static async findAccount(account){
    const userByAccount = await getDatabase().collection('Userdata').findOne(
      {accountNumber : account})
    return userByAccount
  }
  
  
  static async findUserId(id){
    const userById = await getDatabase().collection('Userdata').findOne(
      {_id : new ObjectId(id)})
    return userById
  }

  static async editUser(id,body) {
    const userUpdate = await getDatabase().collection('Userdata').updateOne(
      {_id : ObjectId(id)},
      {$set: body}
      )
    return userUpdate
  }

  static async delUser(id) {
    const userDelete = await getDatabase().collection('Userdata').deleteOne(
      {_id : ObjectId(id)})
    return userDelete
  }

}

module.exports = User