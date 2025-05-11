require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');

const sampleEmployees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 85000,
    hireDate: new Date('2024-01-15')
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 95000,
    hireDate: new Date('2024-02-01')
  },
  {
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    position: 'UI Designer',
    department: 'Design',
    salary: 75000,
    hireDate: new Date('2024-03-10')
  }
];

const createSampleEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing employees
    await Employee.deleteMany({});

    // Create new employees
    const createdEmployees = await Employee.create(sampleEmployees);
    console.log('Sample employees created successfully:', createdEmployees);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating sample employees:', error);
    process.exit(1);
  }
};

createSampleEmployees();
