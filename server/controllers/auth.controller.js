const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

module.exports.signup = async (req,res,next) => {
    // console.log(req.body);
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);  
    const newUser = new User({username,email,password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({
            message:"User created successfully!!"
        });
    }
    catch(err){
        // res.status(500).json(err.message);
        next(err);
    }   
}