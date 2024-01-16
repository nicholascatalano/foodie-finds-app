const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { Restaurant } = require('../models');

//GET restaurants which match the applied filters by user -> end point api/restaurants/filter/restaurants/by
router.get('/?', async (req, res) => {
  try {
    //query can look with one or all
    //name=&cuisine=&price_range=&rating=&city=&type=
    let cuisineProperty;
    let filteredRestaurants;
    let nameProperty;

    if (req.query.cuisine && req.query.name) {
      //if the person provided cuisine
      //expected will be something like cuisine=american,sushi,latin and will need to break it up in an array
      const arrCuisine = req.query.cuisine.split(',');
      cuisineProperty = "'%" + arrCuisine[0] + "%'"; //let the first element of the array
      for (i = 1; i < arrCuisine.length; i++) {
        cuisineProperty += ' OR cuisine LIKE ' + "'%" + arrCuisine[i] + "%'";
      }

      //if the user provided the name of the restaurant
      nameProperty = req.query.name;
      console.log(nameProperty);
    }

    //if statement depending on what the user provided

    filteredRestaurants = await Restaurant.findAll({
      where: {
        [Op.and]: [
          // { name: { [Op.like]: sequelize.literal(`'%${req.query.name}%'`) } },
          { name: req.query.name },
          {
            cuisine: {
              [Op.like]: sequelize.literal(`${cuisineProperty}`),
            },
          },
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
