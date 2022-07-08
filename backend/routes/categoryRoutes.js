import express from 'express';
import Category from '../models/categoryModel.js';

const categoryRouter = express.Router();

// Get category from DB
categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

export default categoryRouter;
