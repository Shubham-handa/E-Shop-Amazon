const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//get api for how many users
router.get(`/`, async (req, res) =>{
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

//post api for entering or sign up the user
router.post(`/addUser`,async (req, res)=>{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        house:req.body.house,
        city:req.body.city,
        zip:req.body.zip,
        state:req.body.state,
        country:req.body.country,

    })
    user = await user.save();
    
    if(!user){
        return res.status(404).send('user cannot be created');
    }
    res.send(user);

})


//post api for login in the application and it will return json web token
router.post(`/login`,async (req,res)=>{
    const user = await User.findOne({
        email:req.body.email,

    })

    if(!user){
        return res.status(400).send('User not found');
    }

    if(user && (req.body.password === user.password)){
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                userId:user.id
            },
            secret,
            {expiresIn:'1d'}
        )
        res.status(200).send({user:user.email,name:user.name,token:token,phone:user.phone,userId:user._id})
    }else{
        res.status(400).send('password is wrong');
    }

    return res.status(200);
})


module.exports =router;