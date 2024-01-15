const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../../config/connection');
const { Restaurant } = require('../models');

//GET restaurants which match the applied filters by user -> end point api/restaurants/filter/restaurants/by
router.get('/filter?', async (req, res) => {
  try {
    //query can look with one or all
    //name=&cuisine=&price_range=&rating=&city=&type=
    console.log(req.query);
    let filters;
    //building the sequelize literal to filter restaurants
    // if (req.query.name && req.query.cuisine) {
    //   filters = [
    //     {
    //       name: req.query.name,
    //     },
    //     {
    //       cuisine: {
    //         [Op.like]: sequelize.literal(`'%${req.query.cuisine}%'`),
    //       },
    //     },
    //   ];
    //   return filters;
    // }
    const filteredRestaurants = await Restaurant.findAll({
      where: {
        [Op.and]: [
          {
            name: req.query.name,
          },
          {
            cuisine: {
              [Op.like]: sequelize.literal(`'%${req.query.cuisine}%'`),
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
