const Restaurant = require('./restaurant.models');
const Review = require('./reviews.models');
const Order = require('./orders.models');
const Meal = require('./meals.models');
const User = require('./user.models');

const associationModel = () => {
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  User.hasMany(Review);
  Review.belongsTo(User);

  User.hasMany(Order)
  Order.belongsTo(User)

  Meal.hasOne(Order)
  Order.belongsTo(Meal)
};

module.exports = associationModel