const express = require("express");

const server = express();
const userModel = require("./model");
const {validatePayload, validateUser, validateLogin } = require("./middleware");

server.use(express.json());

server.get("/api/kullanicilar",(req,res,next)=>{
    try {
        let allUsers = userModel.getAllUsers();
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
});

server.get("/api/kullanicilar/:id",(req,res,next)=>{

    try {
        let user = userModel.getById(req.params.id);
        if(!user){
            res.status(404).json({message:"Böyle bir user yok"});
        }else{
            res.json(user)
        }
    } catch (error) {
        next(error)
    }
})

server.post("/api/kayitol",validatePayload,validateUser,(req,res,next)=>{
    try {
        let insertedUser = userModel.insert(req.body);
        res.status(201).json(insertedUser);
    } catch (error) {
        next();
    }
});
server.post("/api/giris",validatePayload,validateLogin,(req,res,next)=>{
    try {
        res.json({message:`Welcome ${req.findedUser.kullaniciadi}`});
    } catch (error) {
        next(error)
    }
});

module.exports = server;