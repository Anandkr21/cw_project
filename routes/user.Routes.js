const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const {userModel}=require('../model/users.model')
const userRouter=express.Router()

userRouter.post('/register', async(req,res) =>{
    const{name,email,gender,pass,age,city}= req.body;
    try {
        bcrypt.hash(pass,3, (err,hash) =>{
            if(err){
                res.send({'msg':'something wrong', 'error':err.message})
            }else{
                const user=new userModel({name,email,gender,age,city,pass:hash})
                user.save()
                res.send({'msg':'Registered'})
            }
        })
    } catch (err) {
        res.send({'msg':'somthing went wrong', 'error':err.message})
    }
})


userRouter.post('/login', async(req,res) =>{
    const {email,pass} =(req.body)
    try {
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass, (err,result) =>{
                if (result) {
                    let token=jwt.sign({userid:user[0]._id}, 'anand')
                    res.send({'msg':'Login successfully', 'token':token})
                } else {
                    res.send({"msg":'something wrong'})
                }
            })
        }else{
            res.send({"msg":'something wrong'})
        }
    } catch (err) {
        res.send({"msg":'something wrong', 'error':err.message})
    }
})



module.exports={
    userRouter
}