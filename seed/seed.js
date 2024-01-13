const sequelize = require('../config/connection');
const { User, Review, Restaurant } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const restaurantData = require('./restaurantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n-----------USERS SEEDED -----------\n');

  //seed restaurants
  await Restaurant.bulkCreate(restaurantData);
  console.log('\n-----------RESTAURANTS SEEDED -----------\n');

  //seed reviews
  await Review.bulkCreate(reviewData);
  console.log('\n-----------REVIEWS SEEDED -----------\n');

  process.exit(0);
};

seedDatabase();
