const router = require('express').Router();
const { Review } = require('../../models/');
const withAuth = require('../../utils/auth');

// POST route for creating a new review
router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.userId,
    });
    console.log(newReview);
    res.json(newReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
