const User =require('./../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
module.exports = {
    createUser: async function({userInput}, req){
        const email = userInput.email;
        // const password = userInput.password; 
        // const name  = userInput.name;
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            const error = new Error('User existing already!');
            throw error;
        }
      const hashPw = await  bcrypt.hash(userInput.password,12);
       const user = new User({
        email:userInput.email,
        name:userInput.name,
        password:hashPw,
       });
       const createdUser = await user.save();

       return {
        ...createdUser._doc, _id:createdUser._id.toString(),
       };
    }
}