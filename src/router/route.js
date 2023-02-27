const express = require('express') ;

const router = express.Router() ;

const userController = require('../controller/userController')
const productController = require('../controller/productModel')
const orderController= require('../controller/orderController')

let {authantication , authorization} = require('../middleWare/auth')

//----------------------------------------------user-----------------------------------------------------------------------
router.post('/create' , userController.createUser) ;

router.post('/login' , userController.loginUser) ;

//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------product ----------------------------------------------------------------
router.post('/product' , authantication,authorization, productController.createProduct) ;

router.get('/productPrice' , authantication,authorization,productController.getProductPrice) ;

router.get('/productName', authantication, productController.getProductName) ;

router.put('/product/:productId' , authantication, authorization ,productController.updateProduct) ;

router.delete('/product/:productId' , authantication,  authorization ,productController.deleteProduct) ;

//--------------------------------------------------------------------------------------------------------------------

//------------------------------------------order-------------------------------------------------------------------
router.post('/order' , authantication, authorization ,orderController.createOrder) ;




//-----------------------------------------------------------------------------------------------------------------
// router.get('/*' , (req,res) => {
//     res.status(200).send({status : true , message : 'Running properly'});
// })

module.exports = router ;


