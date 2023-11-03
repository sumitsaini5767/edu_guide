const mongoose = require('mongoose'); 

const userDetailSchema = new mongoose.Schema(
    {
        uname:String,
        phone:String,
        email: {type:String, unique:true},
        password:String
    },
    {
        collection:"userInf",
    }
);

mongoose.model("userInf",userDetailSchema);