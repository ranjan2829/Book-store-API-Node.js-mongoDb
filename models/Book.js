const mongoose=require("mongoose");
const bookDB=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Book title is required"],
        trim:true,
        maxLength:[100,"max Book title length is 100 chars only !"]
    },
    author:{
        type:String,
        required:[true,"Author title is required"],
        trim:true,
        maxLength:[100,"max Book title length is 100 chars only !"]
    },
    title:{
        type:Number,
        required:[true,"Book title is required"],
        min:[1000,"Year must be at least 1000"],
        max:[new Date().getFullYear,"year cannot be in future !"]
    },
});
module.exports=mongoose.model("Book",bookDB);