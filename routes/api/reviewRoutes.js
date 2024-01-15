const router = require('express').Router();
const { Review, Restaurant } = require('../../models/');
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

// GET all reviews given a restaurant id (foreign key of Restaurant model)
router.get('/:restaurant_id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        restaurant_id: req.params.restaurant_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No restaurant found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
