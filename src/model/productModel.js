const mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({

productName : {
    type : String ,
    required : true
},

quantity : {
    type : Number ,
    min :1,
    required : true
},

totalPrice :{
    type : Number ,
    required : true
},

paid : {
   type : Boolean ,
   required : true 
},

refund :{ Boolean },

isDeleted : {
    type : String ,
    default : false
}

},{timestamps : true})

module.exports = mongoose.model('product', productSchema)