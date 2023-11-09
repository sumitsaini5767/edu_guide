const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cors());

var nodemailer = require('nodemailer');
const port = 4000;
const mongoUrl = "mongodb+srv://tanishagupta27:tanisha27@cluster0.bia1prq.mongodb.net/?retryWrites=true&w=majority";
const JWT_SECRET ="qazxswedcvfrtgbnhyujm,kiol./;p[]"

mongoose.connect(mongoUrl)
.then(()=>{console.log("Connected to the database");})
.catch((error)=>{console.log("error",error);})

require("./userDetail");
const user = mongoose.model("userInf");

app.post("/signup",async(req, res)=>{
    const {name,email,password} = req.body;
    // const encryptedPassword = await bcrypt.hash(password,10);
    try{
        const oldUser = await user.findOne({email});
        if(oldUser) {
            return res.json({status:"User already exists"});
        }
        // verification for email 
        const secret = JWT_SECRET + email;
        const token = jwt.sign({uname:name,email:email,password:password},secret,{expiresIn:"10m"});
        const link = `http://localhost:3000/verify-account/${email}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tanu42146@gmail.com',
              pass: 'sylj wijg ighg ztsb'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Verify Email Address',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.send({status:"OK",data:link});
        console.log(link);
    }
    catch(err){
        res.send({status:err});
    }
})

app.post("/verify-account/:email/:token",async(req, res)=>{

    const {email,token} = req.params;
    const secret = JWT_SECRET+email 
    // const encryptedPassword = await bcrypt.hash(password,10);
    try{
        const user1 = jwt.verify(token,secret,(err,res)=>{
            if(err){
                console.log(err);
                return err;
            }
            else{
                console.log(res);
                return res;
            }
        });
        if(!user1.email){
            return res.send({status:"error",data:user1})
        }
        const encryptedPassword = await bcrypt.hash(user1.password,10);
        await user.create({
            uname:user1.uname,
            email,
            password:encryptedPassword
        });
        res.send({status:"OK"});
    }
    catch(err){
        console.log(err);
        res.send({status:err});
    }
})


app.post('/',async(req, res) =>{
    const {email, password} = req.body;
    const oldUser = await user.findOne({email});
    if(!oldUser){
        return res.json({status:"Email does not exist"});
    }
    if(await bcrypt.compare(password, oldUser.password)){
        const token = jwt.sign({email:oldUser.email},JWT_SECRET,{
            expiresIn:40
        });

        if(res.status(201)){
            return res.json({status:"OK",data:token});
        }
        else{
            return res.json({status:"Error"});
        }
    }
    res.json({status:"Invalid Password"});
})

app.post('/home',async(req,res)=>{
    const {token} = req.body;
    try{
        const user1 = jwt.verify(token,JWT_SECRET,(err,res)=>{
            if(err){
                return "token expire";
            }
            else{
                return res;
            }
        });
        if(user1==="token expire"){
            return res.send({status:"Error",data:"token expire"});
        }
        user.findOne({email:user1.email})
        .then((data)=>{res.send({status:"OK",data:data});
        })
        .catch((error)=>{
            res.send({status:"Error",data:error});
        });
    }
    catch(error){}
})

app.post("/forgot-password",async(req,res)=>{
    const {email} = req.body;
    try{
        const oldUser = await user.findOne({email});
        if(!oldUser){
            return res.send({status:"User does not exist"});
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email:oldUser.email, id:oldUser._id},secret,{expiresIn:"5m"});
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tanu42146@gmail.com',
              pass: 'sylj wijg ighg ztsb'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: oldUser.email,
            subject: 'Reset Password',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.send({status:"OK",data:link});
        console.log(link);
    }
    catch(err){}
})

app.post("/reset-password/:id/:token",async(req,res)=>{
    const {id,token} = req.params;
    console.log(req.params);
    const oldUser = await user.findOne({_id:id});
    if(!oldUser){
        return res.send({status:"User does not exist"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token,secret);
        const {newPassword} = req.body;
        const encryptedPassword = await bcrypt.hash(newPassword,10);
        await user.updateOne(
        {
            _id:id,
        },
        {
            $set:{
                password:encryptedPassword,
            },
        }
        );
        res.json({status:"OK"});
    }
    catch(err){
        res.json({status:"Something went wrong",data:err});
    }
})

app.listen(port,()=>console.log('listening on port', port));