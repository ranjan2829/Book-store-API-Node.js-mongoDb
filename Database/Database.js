const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB:", process.env.MONGO_URL); // Debugging
        await mongoose.connect(process.env.MONGO_URL, {
            
            
        });
        console.log("MongoDB Connection done!");
    } catch (e) {
        console.error("MongoDB Connection Failed ", e);
        process.exit(1);
    }
};

module.exports = connectDB;
