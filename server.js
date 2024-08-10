const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sabarish:assk3074@cluster0.z0fuw.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a simple schema
const ItemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', ItemSchema);
console.log("db created");
// Routes
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
