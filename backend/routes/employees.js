const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { protect, authorize } = require('../middleware/auth');

// Get all employees - accessible by both admin and normal users
router.get('/', protect, async (req, res) => {
  try {
    const employees = await Employee.find().sort('-createdAt');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create employee - admin only
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee - admin only
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee - admin only
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
