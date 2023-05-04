const Meal = require('../models/meals.models');
const Restaurant = require('../models/restaurant.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfMealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: {exclude: ['status', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Restaurant,
        attributes: { exclude: [ 'status', 'createdAt', 'updateAt' ] },
      },
    ],
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`));
  }

  req.meal = meal;
  next();
});
