const express = require('express');
const Submission = require('../models/Submission');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// All admin routes are protected
router.use(authenticateToken);

// GET /api/admin/submissions - Get all submissions (with optional filter)
router.get('/submissions', async (req, res) => {
  try {
    const { type, isRead, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (type && ['quote', 'contact'].includes(type)) filter.type = type;
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [submissions, total] = await Promise.all([
      Submission.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Submission.countDocuments(filter)
    ]);

    res.json({
      submissions,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/admin/stats - Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalQuotes, totalContacts, unreadQuotes, unreadContacts, todaySubmissions] = await Promise.all([
      Submission.countDocuments({ type: 'quote' }),
      Submission.countDocuments({ type: 'contact' }),
      Submission.countDocuments({ type: 'quote', isRead: false }),
      Submission.countDocuments({ type: 'contact', isRead: false }),
      Submission.countDocuments({ createdAt: { $gte: today } })
    ]);

    res.json({
      totalQuotes,
      totalContacts,
      unreadQuotes,
      unreadContacts,
      todaySubmissions,
      totalSubmissions: totalQuotes + totalContacts
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PATCH /api/admin/submissions/:id/read - Mark as read/unread
router.patch('/submissions/:id/read', async (req, res) => {
  try {
    const { isRead } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { isRead },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: 'Submission not found.' });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/admin/submissions/:id - Delete a submission
router.delete('/submissions/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found.' });
    res.json({ message: 'Submission deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/admin/submissions - Delete all of a type
router.delete('/submissions', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    await Submission.deleteMany(filter);
    res.json({ message: 'Submissions deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
