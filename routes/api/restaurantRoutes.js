const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../../config/connection');
const { User, Review, Restaurant } = require('../../models');
const apiKey = process.env.DB_API_KEY; //api key for external API

// endpoint -> api/restaurants

//GET - all restaurants
router.get('/', async (req, res) => {
  try {
    const allRestaurants = await Restaurant.findAll({
      include: [{ model: Review, as: 'reviews' }],
    });
    const restaurants = allRestaurants.map((restaurant) =>
      restaurant.get({ plain: true })
    );
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST request to create a new restaurant from the review form
router.post('/', async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create({
      ...req.body,
    });
    res.status(200).json(newRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET route for one restaurant
router.get('/:name/:city', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: {
        name: req.params.name,
        city: req.params.city,
      },
    });
    //if the restaurant exists it will return a 200 response
    if (restaurant) {
      res.status(200).json(restaurant.get({ plain: true }));
    } else {
      //if it doesn't exist it will return a 404 response
      res.status(404).json("Restaurant doesn't exists on the database");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a restaurant id from TripAdvisor content API
router.get('/:searchQuery', async (req, res) => {
  try {
    //this will look for the restaurant location using Tripadvisor content API
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const responseFromAPI = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${req.params.searchQuery}&category=restaurants&language=en&key=${apiKey}`,
      options
    );
    const response = await responseFromAPI.json();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a restaurant using the unique location_id identifier from TripAdvisor
router.get('/search/get_details/:location_id', async (req, res) => {
  try {
    // get restaurant details using the locationId and save them in an object
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const restaurantDetails = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/${req.params.location_id}/details?language=en&currency=USD&key=${apiKey}`,
      options
    );
    console.log(req.params);
    const restaurant = await restaurantDetails.json();
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET restaurants which match the applied filters by user -> end point api/restaurants/filter/restaurants/by
router.get('/filter/restaurants/by?', async (req, res) => {
  try {
    //query can look with one or all
    //name=&cuisine=&price_range=&rating=&city=&type=
    console.log(req.query);
    //building object to use as findAllfilters
    // if (req.query.name && req.query.cuisine && req.query && price_range){

    // }
    const filteredRestaurants = await Restaurant.findAll({
      where: {
        cuisine: { [Op.like]: sequelize.literal("'%sushi%'") },
      },
    });
    const restaurants = filteredRestaurants.map((rest) =>
      rest.get({ plain: true })
    );

    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
