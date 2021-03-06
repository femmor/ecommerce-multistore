import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRouter.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

// Initialize backend server
const app = express();

dotenv.config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SeedRouter
app.use('/api/seed', seedRouter);

// App Routers
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => console.log('Database connection failed!', err.message));

// First route
app.get('/', (req, res) => {
  res.send('Backend server working!');
});

// Create port and run app
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
