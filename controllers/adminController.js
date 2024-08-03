const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

  
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const Car = require('../models/carModel');

// Create a car
exports.createCar = async (req, res) => {
  const { name, year, price } = req.body;
  try {
    const newCar = new Car({ name, year, price });
    await newCar.save();
    res.json(newCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Read all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, year, price } = req.body;
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, { name, year, price }, { new: true });
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    await Car.findByIdAndDelete(id);
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getDashboard = async (req, res) => {
    try {
      const totalCars = await Car.countDocuments();
      res.json({ totalCars });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  