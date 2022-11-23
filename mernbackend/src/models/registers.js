const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        firstname : {
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,

        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phonenumber:{
            type:Number,
            required:true,
            unique:true,

        },
        password:{
            type:String,
            required:true
        },
        cpassword:{
            type:String,
            required:true

        }

    }
)

const items = mongoose.model("item",schema);

module.exports=items;
