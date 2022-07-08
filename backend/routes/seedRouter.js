import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const { users, products, categories } = data;

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // Clear all the seeded users
  await User.deleteMany({});
  // Seed users
  const seededUsers = await User.insertMany(users);

  // Clear all the seeded products
  await Product.deleteMany({});
  // Seed users
  const seededProducts = await Product.insertMany(products);

  // Clear all the seeded categories
  await Category.deleteMany({});
  // Seed users
  const seededCategories = await Category.insertMany(categories);

  res.json(seededUsers, seededProducts, seededCategories);
});

export default seedRouter;
