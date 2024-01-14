//import models
const User = require('./User');
const Review = require('./Review');
const Restaurant = require('./Restaurant');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

Restaurant.belongsToMany(User, {
  through: {
    model: Review,
    unique: false,
  },
});

Restaurant.hasMany(Review, {
  foreignKey: 'restaurant_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Review,
  Restaurant,
};
