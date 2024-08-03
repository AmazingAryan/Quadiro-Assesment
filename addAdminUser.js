const mongoose = require('mongoose');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin_password', 10);

    // Create an admin user
    const adminUser = new User({
      username: 'admin_username',
      password: hashedPassword,
      isAdmin: true
    });

    // Save the admin user to the database
    await adminUser.save();
    console.log('Admin user created');

    mongoose.disconnect();
  })
  .catch(err => console.error('Error connecting to MongoDB', err));
