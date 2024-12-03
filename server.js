


require("dotenv").config();
const connectDB = require("./Database/Database");
const path = require("path");
const bookRoutes = require("./Routes/book-routes");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use("/api/books", bookRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});


