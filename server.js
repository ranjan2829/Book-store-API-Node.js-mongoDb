require("dotenv").config()
const connectDB=require("./Database/Database");
const path=require("path");

const express=require("express");
const app=express();
const PORT=process.env.PORT|| 3000;
app.use(express.static(path.join(__dirname, 'public')));
//connect to DB

//connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})
app.listen(PORT,()=>{
    console.log("server Started !!!!=>>>>>>>>>>>>>>>");
    
})