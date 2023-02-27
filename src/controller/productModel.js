const mongoose = require('mongoose') ;
const productModel = require('../model/productModel') ;
const ObjectId = mongoose.Types.ObjectId ;


const {isValidString}  = require('../validation/validator')

const createProduct = async (req , res) =>{
    try{
        const data = req.body ;
        const {productName , quantity , totalPrice , paid } = data ;

        if(Object.keys(data).length == 0){
            return res.status(400).send({status:false , message : `please provide some data `}) 
        }

        if(!productName){
            return res.status(400).send({status:false , message : `please provide product name , Product name is mendatory `})
        }

        if(!isValidString(productName)){
            return res.status(400).send({status:false , message : `please provide valid product name`})
        }

       if(!quantity){
        return res.status(400).send({status:false , message : `please provide quantity ,Quantity is mendatory `})
       }

       if(!totalPrice){
        return res.status(400).send({status:false , message : `please provide price ,Price is mendatory`})
       }

       if(!paid){
        return res.status(400).send({status:false , message : `please provide paid data,paid data is mendatory`})
       }


     const create = await productModel.create(data)

        return res.status(400).send({status:false , message : `Created Succefully` , data : create})
       

    }
    catch(err){
         return res.status(500).send({status:false , message : err.message}) 
    }
}


const getProductPrice = async (req,res) =>{
   // const productDetail = {quantity} ;
   const product = {isDeleted : false}

  const get = await productModel.find(product).select({_id : 1, totalPrice : 1})

  if(!get){
    return res.status(400).send({status : false , message : `product doesnot exist or deleted`})
  }

  return res.status(200).send({status : true, data : get})

}

const getProductName = async (req,res) =>{
    try{
    const product = {isDeleted : false}

    const get = await productModel.find(product).select({_id : 1 , productName: 1})

    if(!get){
        return res.status(400).send({status : false , message : `product doesnot exist or deleted`})
    }

    return res.status(200).send({status : true, data : get})
 }
 catch(err){
    return res.status(500).send({status :false , message : err.message})
 }
}

const updateProduct = async (req ,res) =>{
   try{

     const data = req.body ;
     const productId = req.params.productId

    const {productName , quantity , totalPrice , paid , refund } = data ;

    if(Object.keys(data).length == 0){
        return res.status(400).send({status:false , message : `please provide some data `}) 
    }

    if(!ObjectId(productId)){
        return res.status(400).send({status:false , message : `please provide valid product id`})
    }

    if(!isValidString(productName)){
        return res.status(400).send({status:false , message : `please provide valid product name`})
    }

    let findProduct = await productModel.findOne({_id : productId ,isDeleted : true})
    if(findProduct){
        return res.status(400).send({status:true , message : 'Product has already been deleted'})
    }

    let update = await productModel.findOneAndUpdate(
        {_id : productId},
     { 
         $set : {
            productName ,
             quantity , 
             totalPrice ,
              paid , 
              refund
         },
     },
     {new:true} 
     );
  
     return res.status(200).send({status:true,message : 'Updated successfully', data :update})

   }
  catch(err){
    return res.status(500).send({status :false , message : err.message})
  }

}


const deleteProduct = async (req,res) =>{
    try{
        let productId = req.params.productId
    
        if(!ObjectId.isValid(productId)){
            return res.status(400).send({status:true , message : 'please provide valid productId'})
        }
    
    
    //-------------------------here we are checking whether that product is already deleted or not-------------------
      let deleted = await productModel.findOne({_id : productId, isDeleted : true})
      if(deleted){
        return res.status(404).send({message : false , message : 'product doesnot exist or product is deleted '})
      }
    //-------------------------------------------------------------------------------------------------------------
    
    
      let deleting = await productModel.findOneAndUpdate(
        {_id : productId},
        {
            
                isDeleted:true ,
            
        },
        
      )
    
      return res.status(200).send({status:true,message : 'Deleted successfully'})
     }
     catch(err){
        return res.status(500).send({status:false,message : err.message})
     }
}


module.exports = {createProduct , getProductPrice , getProductName , updateProduct , deleteProduct}