const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const connectDB = require('./../backend/config/db'); 

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());

// User routes
const userRoutes = require('./users/userRoutes');
app.use('/api/users', userRoutes);
// Post Routes
const postRoutes = require('./posts/postRoutes');
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
})

// app.listen(5000, console.log('Server running on port 5000'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));