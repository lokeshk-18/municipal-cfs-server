// const mongoose = require("mongoose")
// const express = require("express")
const User = require('../models/user');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const session = require('express-session');

module.exports.signUp = async (req,res)=>
{
    
      try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            mobileno: req.body.mobileno,
            aadhaar : req.body.aadhaar,
            municipality : req.body.municipality,
            dob : req.body.dob,
            address : req.body.address,
          });

        const user = await newUser.save();
        res.status(200).json(user);
      }
       catch (err) {
        console.log(err)
        res.status(500).json(err)

      }
}


module.exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("User not found");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("Wrong password")
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    // console.log(err)
    }
  };




// async (req, res) => {
//     var { name, mobileno, email, aadhaar, dob, address, password } =  req.body
//     try {
//         const existinguser = await User.findOne({ email })
//         if (existinguser) {
//             return res.status(400).json({ message: 'User already found..' })
//         }
//         const hashPassword = await bcrypt.hash(password, 12);
//         const user = new User({ name, mobileno, email, aadhaar, dob, address, password : hashPassword})
//         await user.save();
//         const token = jwt.sign({ email: user.email, id: user._id }, 'token', { expiresIn: '1h' })
//             res.status(200).json({ result: User, token })
            
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).json('Something went wrong...!!')
//     }


// async(req,res) =>{
//     const { email, password } = req.body;
//     console.log(req.body)
//     try {
//         const existinguser = await User.findOne({ email })
     
//         if (!existinguser) {
//             console.log("User not found...");
//             return res.status(404).json({ message: "User not found..." })
//         }
//         const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
//         if (!isPasswordCrt) {
//             return res.status(400).json({ message: "Invalid credentials" })
//         }
//         session = req.session;
//         req.session._id = existinguser._id
//         res.redirect('/')
        
//     } catch (err) {
//         res.status(500).json(err.message)
//     }
// }