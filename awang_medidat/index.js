const router = require('express').Router()
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

router.get("/awangmedidat",async (req,res) => {
  try{
    const usersData = await redis.get("user:data");
    if(usersData){
      console.log("ini dari redis")
      res.status(200).json({
        users: JSON.parse(usersData)
      })
    }else{
      console.log("data blum cache")
      const users = await axios.get("http://localhost:4001/users")
      redis.set("user:data",JSON.stringify(users.data))
      res.status(200).json({
        usersNew: users.data
      })     
    }
  }catch(err){
    res.status(500).json(err)
  } 
})

router.post("/awangmedidat",async (req,res) => {
  try{
    await redis.del("user:data");
    const data  = await axios.post("http://localhost:4001/users",{
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber
    })
    const userdata = data.data.ops[0]
    res.status(201).json(userdata)  
  }catch(err){
    res.status(500).json(err)
  } 
})

router.get("/awangmedidat/:id",async (req,res) => {
  try{
    const id = req.params.id
    const userById = await redis.get(`user:${id}`);
    if(userById){
      console.log("ini id dari redis")
      res.status(200).json({
        user: JSON.parse(userById)
      })
    }else{
      console.log("data blum cache")
      const user = await axios.get(`http://localhost:4001/users/${id}`)
      redis.set(`user:${id}`,JSON.stringify(user.data))
      res.status(200).json({
        userNew: user.data
      })     
    }
  }catch(err){
    res.status(500).json(err)
  } 
})

router.put("/awangmedidat/:id",async (req,res) => {
  try{
    const id = req.params.id
    await redis.del(`user:${id}`);
    await redis.del("user:data");
      const user = await axios.put(`http://localhost:4001/users/${id}`,{
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
      })
      res.status(200).json({
        userNew: user.data
      })     
  }catch(err){
    res.status(500).json(err)
  } 
})


router.delete("/awangmedidat/:id",async (req,res) => {
  try{
    const id = req.params.id
    await redis.del(`user:${id}`);
    await redis.del("user:data");
      const user = await axios.delete(`http://localhost:4001/users/${id}`)
      res.status(200).json("User Have Deleted")     
  }catch(err){
    res.status(500).json(err)
  } 
})

module.exports = router