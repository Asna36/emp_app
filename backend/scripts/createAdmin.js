require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminUser = await User.create({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:', adminUser);

    const regularUser = await User.create({
      username: 'user',
      password: 'user123',
      role: 'user'
    });

    console.log('Regular user created successfully:', regularUser);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating users:', error);
    process.exit(1);
  }
};

createAdmin();
