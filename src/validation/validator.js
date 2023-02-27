//-----------------------------------validation of string ---------------------------------------------------------

const isValidString = (name) =>{
   return /^[a-zA-Z ]+$/.test(name)
}

//-----------------------------------------------------------------------------------------------------------------

//-------------------------------------------Validation for Email ------------------------------------------------------
const isValidemail = function (email) {
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email);
}
//-------------------------------------------------------------------------------------------------------------------


//-----------------------------------------Validation for password ----------------------------------------------- 
const isValidpassword = function (password) {
    return (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,15}$/).test(password);
}
//---------------------------------------------------------------------------------------------------------------


const isValidDesignation = function(designation){
    const data = ['admin' , 'supervisior'].filter(e1 => e1==designation)
    return data.length > 0;
}



module.exports = {isValidString, isValidemail ,isValidpassword, isValidDesignation}