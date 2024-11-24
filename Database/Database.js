const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://ranjanshitole3129:ranjan3129@cluster0.ssp5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("MongoDb Connection done !");
        

    }
    catch(e){
        console.error("MOngoDB onnection Failed ",e);
        process.exit(1);

    }
    finally{
        //mongoose.connection.close()
        //console.log("Connections closed !!!!!");
        
    }
}
module.exports=connectDB;