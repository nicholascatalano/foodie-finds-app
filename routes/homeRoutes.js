const router = require('express').Router();
const { User, Review, Restaurant } = require('../models');
const withAuth = require('../utils/auth');

// GET all reviews for homepage
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [User],
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    //grab all restaurants for filters section
    const restaurantData = await Restaurant.findAll();
    const restaurants = restaurantData.map((restaurant) =>
      restaurant.get({ plain: true })
    );
    //grab cuisine from each restaurant
    const cuisineData = restaurants.map((rest) => rest.cuisine);
    const cuisine = cuisineData.toString().split(',');
    const cuisineUnique = [...new Set(cuisine)]; //remove duplicates
    //capitalize first letter
    let cuisineOptions = [];
    for (let i = 0; i < cuisineUnique.length; i++) {
      const word = cuisineUnique[i].split('');
      word[0] = word[0].toUpperCase();
      cuisineOptions.push(word.join(''));
    }

    // render on allPosts view
    res.render('homepage', {
      reviews,
      loggedIn: req.session.loggedIn,
      cuisineOptions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login page
router.get('/login', (req, res) => {
  //if a session exists - redirect to the homepage

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // render login page
  res.render('login', { layout: false });
});

// GET signup route
router.get('/signup', (req, res) => {
  // if logged in, redirect to homepage, else render signup page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', { layout: false });
});

// GET new review route
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newReview', { loggedIn: req.session.loggedIn, layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all Reviews, GET Restaurant by PK, given a restaurant id
router.get('/review/:restaurant_id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        restaurant_id: req.params.restaurant_id,
      },
      include: [User],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    if (!reviewData) {
      res.status(404).json({ message: 'No reviews found!' });
      return;
    }

    const restaurantData = await Restaurant.findByPk(req.params.restaurant_id);
    const restaurant = restaurantData.get({ plain: true });

    // res.send({ reviews });
    res.render('reviewsPerRestaurant', {
      layout: 'main',
      reviews,
      restaurant,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET about us route:
router.get('/aboutus', (req, res) => {
  // render about us page
  res.render('aboutus', { layout: 'main', loggedIn: req.session.loggedIn });
});

module.exports = router;
