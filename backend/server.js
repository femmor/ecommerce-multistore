import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Initialize backend server
const app = express();

dotenv.config();

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => console.log('Database connection failed!', err));

// First route
app.get('/', (req, res) => {
  res.send('Backend server working!');
});

// Create port and run app
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
