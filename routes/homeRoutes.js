const router = require('express').Router();
const { User } = require('../models');

//login page
router.get('/login', (req, res) => {
  //if a session exists - redirect to the homepage
  //   console.log(req.session);
  //   if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  //   }
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
