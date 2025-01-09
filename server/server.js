const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); 

// MongoDB connection
mongoose .connect(process.env.MONGO_URI, {
    })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
