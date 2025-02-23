const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load .env file

const app = express();
const port = 3030;

app.use(express.json());

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
}

// ✅ Updated MongoDB Connection (No Deprecated Options)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use('/api', require('./routes'));

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});