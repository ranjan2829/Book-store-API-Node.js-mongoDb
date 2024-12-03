const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL  // Fixed typo: 'proce' to 'process'
        );
        console.log("MongoDB Connection done!");
    }
    catch (e) {
        console.error("MongoDB Connection Failed ", e);
        process.exit(1);
    }
};

module.exports = connectDB;