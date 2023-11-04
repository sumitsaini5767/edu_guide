const mongoose = require('mongoose'); 

const userDetailSchema = new mongoose.Schema(
    {
        uname:String,
        phone: {type:String, unique:true},
        email: {type:String, unique:true},
        password:String
    },
    {
        collection:"userInf",
    }
);

mongoose.model("userInf",userDetailSchema);