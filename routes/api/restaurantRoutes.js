const router = require('express').Router();
const { User, Review, Restaurant } = require('../../models');

// endpoint -> api/restaurants

//POST request to create a new restaurant from the review form
router.post('/', async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create({
      // ...req.body
      // waiting on the model
    });
    res.status(200).json(newRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
