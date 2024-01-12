const router = require('express').Router();
const { User } = require('../models');

// GET all reviews for homepage
router.get('/', async (req, res) => {
  // try {
  //   const reviewData = await Review.findAll({
  //     include: [User],
  //   });
  //   const reviews = reviewData.map((review) => review.get({ plain: true }));
  //   // render on allPosts view
  //   res.render('homepage', {
  //     reviews,
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  res.render('homepage');
});

//login page
router.get('/login', (req, res) => {
  //if a session exists - redirect to the homepage

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // render login page
  res.render('login');
});

// GET signup route
router.get('/signup', (req, res) => {
  // if logged in, redirect to homepage, else render signup page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
