const router = require('express').Router();
const { Review } = require('../models/');
const withAuth = require('../utils/auth');

// GET all auth user's posts
router.get('/', withAuth, async (req, res) => {
  try {
    // let's find user id and incl all their posts
    const reviewData = await Review.findAll({
      where: {
        userId: req.session.userId,
        loggedIn: req.session.loggedIn,
      },
    });

    // Pass their posts to the view & render into all posts admin using dashboard layout:
    const reviews = reviewData.map((review) =>
      review.get({
        plain: true,
      })
    );
    res.render('dashboard', { reviews });
  } catch (err) {
    // if withAuth fails...
    // if user has no active posts, redirect to login page:
    res.redirect('login');
  }
});
