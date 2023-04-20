
const uuid = require("uuid");

function createId(){
    return uuid.v1();
}


function initialUsers(){
    return [
        {id:createId(), kullaniciadi:"admin",password:"root"}
    ]
}

let allUsers = initialUsers();

function getAllUsers (){
    return allUsers;
}

function getById(id){
    let user =null;
for (let i=0; i<allUsers.length ; i++){
    const element = allUsers[i];
    if(element.id == id){
        user = element
        break
    }
}
return user;
}

function insert(user){
    user.id = createId()
    allUsers.push(user)
    return user;
}


function loginCheck(user){
    let isFinded = null;
     for (let i = 0; i < allUsers.length; i++) {
        const item = allUsers[i];
        if(user.kullaniciadi == item.kullaniciadi && user.password && item.password){
            isFinded = item;
            break;
        }
    }
    return isFinded;
}


module.exports = {
    getAllUsers,
    getById,
    insert,
    loginCheck
}