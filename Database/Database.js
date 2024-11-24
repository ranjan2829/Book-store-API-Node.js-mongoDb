const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(
            ""
        )
        console.log("MongoDb Connection done !");
        

    }
    catch(e){
        console.error("MOngoDB onnection Failed ",e);
        process.exit(1);

    }
}