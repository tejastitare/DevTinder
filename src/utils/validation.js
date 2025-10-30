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

const validateEditProfileData = (req)=>{
    const allowedEdits = ["firstName","lastName","emailId","age","gender","photoUrl","skills","about"];

    const data = req.body;

    const isAllowed = Object.keys(data).every((key)=>allowedEdits.includes(key));
    return isAllowed;
}


const ValidateForgotPasswordData = (req)=>{
const {emailId,newpassword}= req.body;


if(!validator.isEmail(emailId)){
    throw new Error("Email Id is not valid!");
}
else if(!validator.isStrongPassword(newpassword)){
    throw new Error("Please enter the strong password");
}
};

module.exports = {
    validateSignupData,
    validateEditProfileData,
    ValidateForgotPasswordData
}