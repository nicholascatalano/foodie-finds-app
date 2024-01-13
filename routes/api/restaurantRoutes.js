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

//GET route for one restaurant
router.get('/id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: {
        location_id: req.params.location_id,
      },
    });
    res.status(200).json(restaurant.get({ plain: true }));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
