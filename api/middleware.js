const userModel = require("./model");

 
function validatePayload(req,res,next){
    try {
        const {kullaniciadi, password}= req.body;
        if(!kullaniciadi || !password){
            res.status(400).json({message:"Eksik alan var"});
        }
        else{
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateUser(req,res,next){
    try {
        const {kullaniciadi}= req.body;
        const allUsers = userModel.getAllUsers();
        let isExistUser = allUsers.filter(x=>x.kullaniciadi == kullaniciadi).length>0;
        if(isExistUser){
            res.status(400).json({message:"Bu bilgiler sistemde mevcut."});
        }else{
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateLogin(req,res,next){
    try {
        let user = {kullaniciadi:req.body.kullaniciadi,password:req.body.password};
        let existUser = userModel.loginCheck(user);
        if(!existUser){
            res.status(404).json({message:"Kayıt bilgileri hatalı girildi."})
        }else{
            req.findedUser = existUser;
            next();

        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    validateUser,
    validatePayload,
    validateLogin
}