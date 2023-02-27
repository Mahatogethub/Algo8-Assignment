const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    userName : {
        type :String ,
        required : true ,
        unique : true
    },

    password : {
        type : String ,
        required : true ,
    },

    designation : {
        type : String ,
        enum : ['admin' , 'supervisor'] ,
        required : true 
    },

    assignedTable : {
        type :String ,
        required : true 
    },
},{timestamps : true})

module.exports = mongoose.model('user' , userSchema)