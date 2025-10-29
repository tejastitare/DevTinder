const validator = require('validator');

const validateSignupData = (req)=>{
const {firstName,lastName,emailId,password}= req.body;

if(!firstName || !lastName){
    throw new Error("Enter the Required details");
}
else if(!validator.isEmail(emailId)){
    throw new Error("Email Id is not valid!");
}
else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter the strong password");
}
};

module.exports = {
    validateSignupData,
}