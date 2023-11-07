const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cors());

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
    const encryptedPassword = await bcrypt.hash(password,10);
    try{
        const oldUser = await user.findOne({email});
        if(oldUser) {
            return res.json({status:"User already exists"});
        }
        await user.create({
            uname:name,
            email,
            password:encryptedPassword
        });
        res.send({status:"OK"});
    }
    catch(err){
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
        console.log("after jwt verify",user1);
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


app.post('/forgot-password',async(req,res)=>{
    const{email} = req.body;
    try{
        const oldUser = await user.findOne({email});
        if(!oldUser){
            return res.json({status:"user not exists"});
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email:oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link =`http://localhost:4000/reset-password/${oldUser._id}/${token}`;
        console.log(link);
    }
    catch(error) { 
        console.log(error);
    }
})

app.get("/reset-password/:id/:token", async (req, res) => {
    const {id, token} = req.params;
    console.log(req.params);
    const oldUser = await user.findOne({ email});

    if(!oldUser){
        return res.json({status:"user not exists"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify= jwt.verify(token, secret);
        res.send("verified");
    }catch{
        res.send("not verified");
    }
})

app.listen(port,()=>console.log('listening on port', port));