import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

// Login user
userRouter.post('/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  // if user exists, send user object
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
      });
      return;
    }
  }
  // if user does not exist, send error message
  res.status(401).send({ message: 'Invalid Email or Password' });
});

// Register user
userRouter.post('/register', async (req, res) => {
  const { name, email, password, address, phone, image } = req.body;
  const user = await User.findOne({ email });

  // if user exists, send error message
  if (user) {
    res
      .status(401)
      .send({ message: `User with the email "${email}" already exists` });
    return;
  }

  // if user does not exist, create user
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    address,
    phone,
    image,
  });
  await newUser.save();
  res.send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    address: newUser.address,
    phone: newUser.phone,
    image: newUser.image,
    isAdmin: newUser.isAdmin,
  });
  res.send({ message: 'User created successfully' });
});

// Update user
userRouter.put('/update', async (req, res) => {
  const { name, email, password, address, phone, image } = req.body;
  const user = await User.findById(req.body._id);

  const hashPassword = bcrypt.hashSync(password, 10);

  // if user exists, update user
  if (user) {
    user.name = name;
    user.email = email;
    user.password = hashPassword;
    user.address = address;
    user.phone = phone;
    user.image = image;
    await user.save();
    res.send({ message: 'User updated successfully' });
    return;
  }
  // if user does not exist, send error message
  res.status(401).send({ message: 'User does not exist' });
});

export default userRouter;
