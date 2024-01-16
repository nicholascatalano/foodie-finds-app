const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { Restaurant } = require('../models');

//GET restaurants which match the applied filters by user -> end point api/restaurants/filter/restaurants/by
router.get('/?', async (req, res) => {
  try {
    //query can look with one or all
    //name=&cuisine=&price_range=&rating=&city=&type=
    console.log(req.query);

    //building the sequelize literal to filter restaurants
    //expected will be cuisine=american,sushi,latin
    const arrCuisine = req.query.cuisine.split(',');
    let cuisineProperty = "'%" + arrCuisine[0] + "%'"; //let the first element of the array
    for (i = 1; i < arrCuisine.length; i++) {
      cuisineProperty += ' OR cuisine LIKE ' + "'%" + arrCuisine[i] + "%'";
    }

    const filteredRestaurants = await Restaurant.findAll({
      where: {
        [Op.and]: [
          { name: { [Op.like]: sequelize.literal(`'%${req.query.name}%'`) } },
          {
            cuisine: {
              [Op.like]: sequelize.literal(`${cuisineProperty}`),
            },
          },
        ],
        // { price_range: req.query.price_range || '' },
        // { city: req.query.city || '' },
        // { type: req.query.type || '' },
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
