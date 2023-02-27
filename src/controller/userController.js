const jwt = require('jsonwebtoken') ;
const userModel = require('../model/userModel') ;

const {isValidemail, isValidpassword , isValidDesignation} = require('../validation/validator')

const createUser = async (req , res) => {
  try{
  const data = req.body ;

  const {userName , password , designation , assignedTable} = data

  if(Object.keys(data).length == 0){
   return res.status(400).send({status:false , message : `please provide some data `})
  }

   if(!userName){
   return res.status(400).send({status:false, message : `please provide email , email is menadatory`})
   }

   if(!isValidemail(userName)){
   return res.status(400).send({status:false , message : `please provide valid email`})
   }
   
   if(!password){
     return res.status(400).send({status:false , message : `please provide password , password is menadatory`})
    }
    
    
    if(!isValidpassword(password)){
      return res.status(400).send({status:false , message : `please provide valid password`})
    }
    
    const isChecked = await userModel.findOne({email : userName})
    if(isChecked){
      if(isChecked.userName == userName){
        return res.status(400).send({status:false,message:`This ${email} is not unique,Please provide unique emailId`})
      }
    }    
   
   if(!designation){
   return res.status(400).send({status:false , message : `please provide designation , designation is menadatory`})
   }

   if(!isValidDesignation(designation)){
    return res.status(400).send({status:false , message : `please provide valid designation from admin or supervisor`})
   }

   if(!assignedTable){
   return res.status(400).send({status:false , message : `please provide assignTable , assignTable is menadatory`})
   }   

   const create = await userModel.create(data)

   return res.status(201).send({status : true , message : `Created Successfully`, data : create})
  }
  catch(err){
    return res.status(500).send({status : false , message :err.message})
  }

}


const loginUser = async (req,res)=>{
   try{
   const email = req.body.userName;
   const password =  req.body.password ;

  if(Object.keys(req.body).length == 0 ){
   return res.status(400).send({status:false , message : `please provide some data to loginIn`})
  }

   if(!email){
   return res.status(400).send({status:false , message : `please provide email , email is menadatory for login`})
   }

   if(!isValidemail(email)){
   return res.status(400).send({status:false , message : `please provide valid email`})

   }

   
   if(!password){
     return res.status(400).send({status:false , message : `please provide password , password is menadatory for login`})
    }
    
    if(!isValidpassword(password)){
      return res.status(400).send({status:false , message : `please provide valid password`})
    }
    const user = await userModel.findOne({email : email })
   if(!user){
    return res.status(400).send({status:false , message : `please provide correct email for login`})
    }

   const isCheckPassword = await userModel.findOne({password : password})

   if(!isCheckPassword){
   return res.status(400).send({status:false , message : `please provide correct password for login`})
   }

   const token =  jwt.sign({
    user : user._id ,
    expiresIn: "24h" ,
   },
    'alog8'
   )

   return res.status(200).send({ status: true, message: "User login successfull", data: { user: user._id, token: token } })

   }
   catch(err){
    res.status(400).send({status:false , message : err.message})
   }
}


module.exports = {createUser,loginUser}