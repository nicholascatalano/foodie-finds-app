const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { Restaurant } = require('../models');

//GET restaurants which match the applied filters by user -> end point api/restaurants/filter/restaurants/by
router.get('/?', async (req, res) => {
  try {
    console.log('you hit me');
    //query can look with one or all
    //name=&cuisine=&price_range=&rating=&city=&type=
    let cuisineProperty = {};
    let filteredRestaurants;
    let nameProperty;
    let arrCuisine;

    if (req.query.cuisine) {
      //if the person provided cuisine
      arrCuisine = req.query.cuisine.split(',').map((cuisineItem) => {
        return {
          cuisine: { [Op.like]: `%${cuisineItem}%` },
        };
      });
      cuisineProperty = { [Op.or]: arrCuisine };
    }

    //search with the filters provided by the user
    filteredRestaurants = await Restaurant.findAll({
      where: {
        // cuisine: { [Op.like]: '%sushi%' },
        [Op.and]: [
          { name: { [Op.like]: '%Nobu%' } },
          cuisineProperty,
          // { price_level: req.query.price_range || '' },
          // { city: req.query.city || '' },
          // { sub_categories: req.query.type || '' },
        ],
      },
    });

    const restaurants = filteredRestaurants.map((rest) =>
      rest.get({ plain: true })
    );

    res.status(200).json(restaurants);
    // res.status(200).json(req.query);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
