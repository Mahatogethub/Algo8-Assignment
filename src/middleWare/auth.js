const jwt = require('jsonwebtoken') ;
const productModel = require('../model/productModel');
const userModel = require('../model/userModel');

const authantication = async function(req,res,next){
    try{
    let token = req.headers['x-api-key'] ;

    if(!token){
        return res.status(400).send({status:false , message : 'token not present ,please provide token'})
    }

 //------------verifying whether the token is given is valid or not----------------------------------------------------   
    let decodedToken = jwt.verify(token , 'alog8')
   if(!decodedToken){
    return res.status(401).send({status:false , message : 'Invalid creditiential ,Plase provide valide creditiential'})
   }
//---------------------------------------------------------------------------------------------------------------

//----------------here we are the checking whether the loggedInuser is equal to token or not ----------------------
   req.loggedInUser = decodedToken.userId ;
//-----------------------------------------------------------------------------------------------------

   next() ;
}
catch(err){
    return res.status(500).send({status:false , message : err.message})
}

}


// Middleware to check user access
const authorization = async (req, res, next) => {
   try{

   const designation = req.params.userId ;
 
   const finda = await userModel.findOne( {designation : designation})
   // Check if user is an admin
   if (designation === 'admin') {
     return next(); 
   }
 
   if (finda === 'admin') {
      return next(); 
    }

   const requestedProduct = req.params.productId; 
   if (finda === 'supervisor'){ 
     return next(); 
   }
 
     let saveData = await productModel.find(requestedProduct) ;

       let product = saveData.productId ;

       if(product != req.loggedInUser){
         return res.status(403).send({status:false , message : 'Permission is denied for the user'})
     }
   
   next()
 }
 catch(err){
   return res.status(500).send({message : err.message})
 }
}

 

module.exports = {authantication , authorization}