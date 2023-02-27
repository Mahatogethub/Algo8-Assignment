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
   // Get user designation and assigned table(s) from authentication token or session
   const designation = req.params.userId ;
 
   const finda = await userModel.findOne( {designation : designation})
   // Check if user is an admin
   if (designation === 'admin') {
     return next(); // Admin has access to all tables, so allow access to route
   }
 
   if (finda === 'admin') {
      return next(); // Admin has access to all tables, so allow access to route
    }

   // Check if user is a supervisor and has access to the requested table
   const requestedProduct = req.params.productId; // Assume table ID is provided in URL parameter
   if (finda === 'supervisor'){ //&& assignedTable.includes(requestedProduct)) {
     return next(); // Supervisor has access to requested table, so allow access to route
   }
 

     let saveData = await productModel.find(requestedProduct) ;

       let product = saveData.productId  //.toString() ;

       if(product != req.loggedInUser){
         return res.status(403).send({status:false , message : 'Permission is denied for the user'})
     }
   
   next()
 }
 catch(err){
   return res.status(500).send({message : err.message})
 }
}
//  // Example route that requires admin access
//  app.get('/admin-only', checkAccess, (req, res) => {
//    // Only admin users can access this route
//    res.json({ message: 'Admin access granted' });
//  });
 
//  // Example route that requires supervisor access to a specific table
//  app.get('/table/:tableId', checkAccess, (req, res) => {
//    // Only admin users or supervisors with access to the requested table can access this route
//    res.json({ message: 'Table access granted' });
//  });
 

module.exports = {authantication , authorization}