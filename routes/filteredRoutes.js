const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { Restaurant, Review } = require('../models');

//GET restaurants which match the applied filters by user -> end point api/restaurants/filter/restaurants/by
router.get('/?', async (req, res) => {
  try {
    console.log('you hit me');
    //query can look with one or all
    //name=&cuisine=&price_range=&rating=&city=&type=
    let cuisineProperty;
    let nameProperty;
    let priceProperty;
    let filteredRestaurants;
    let typeProperty;
    let arrType;

    //city is always provided
    const cityProperty = { city: { [Op.like]: `%${req.query.city}%` } };

    //if the person provided cuisine
    if (req.query.cuisine) {
      const arrCuisine = req.query.cuisine.split(',').map((cuisineItem) => {
        return {
          cuisine: { [Op.like]: `%${cuisineItem}%` },
        };
      });
      cuisineProperty = { [Op.or]: arrCuisine };
    }

    //if a restaurant name is provided
    if (req.query.name) {
      nameProperty = { name: { [Op.like]: `'%${req.query.name}%'` } };
    }

    //if price_level is provided by the user
    if (req.query.price_level) {
      //the user can provide more than one input
      const arrPrice = req.query.price_level.split(',').map((priceItem) => {
        return {
          price_level: { [Op.like]: `%${priceItem}%` },
        };
      });
      priceProperty = { [Op.or]: arrPrice };
    }

    //if type of restaurant is provided
    if (req.query.type) {
      //options are sit_down, quick_bites, cafe, etc.
      arrType = req.query.type.split(',').map((type) => {
        return {
          sub_categories: { [Op.like]: `%${type}%` },
        };
      });
      arrType.push({ sub_categories: { [Op.like]: `%%` } }); //add it if restaurants sub_categories is empty
      typeProperty = { [Op.or]: arrType };
    }

    //search with the filters provided by the user
    filteredRestaurants = await Restaurant.findAll({
      where: {
        [Op.and]: [
          cityProperty,
          nameProperty,
          cuisineProperty,
          priceProperty,
          typeProperty,
        ],
      },
      include: [{ model: Review }],
    });

    const restaurants = filteredRestaurants.map((rest) =>
      rest.get({ plain: true })
    );

    //get the reviews for each restaurant
    const reviews = restaurants.map((restaurant) => restaurant.reviews);
    // res.status(200).json(restaurants);
    res.render('filter', {
      restaurants,
      reviews,
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json(req.query);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
