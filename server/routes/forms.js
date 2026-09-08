const express = require('express');
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const router = express.Router();

// Validation rules
const formValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.'),
  body('email').isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('message').trim().notEmpty().withMessage('Message is required.')
];

// POST /api/forms/quote
router.post('/quote', formValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, companyName, email, phone, productInterest, industry, message } = req.body;

    const submission = new Submission({
      type: 'quote',
      fullName,
      companyName: companyName || '',
      email,
      phone,
      productInterest: productInterest || '',
      industry: industry || '',
      message
    });

    await submission.save();

    res.status(201).json({ success: true, message: 'Quote request submitted successfully!' });
  } catch (error) {
    console.error('Error saving quote submission:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST /api/forms/contact
router.post('/contact', formValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, companyName, email, phone, productInterest, industry, message } = req.body;

    const submission = new Submission({
      type: 'contact',
      fullName,
      companyName: companyName || '',
      email,
      phone,
      productInterest: productInterest || '',
      industry: industry || '',
      message
    });

    await submission.save();

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
