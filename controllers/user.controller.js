const Meal = require('../models/meals.models');
const Order = require('../models/orders.models');
const Restaurant = require('../models/restaurant.models');
const User = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
    attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Order,
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: Meal,
            attributes: ['name', 'price'],
            include: [
              {
                model: Restaurant,
                attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
              },
            ],
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    users,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;
  const oldInfo = user;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'User information has been updated',
    oldInfo: { name: oldInfo.name, emaol: oldInfo.email },
    newInfo: { name: user.name, email: user.emal }
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id}has been deleted`,
  });
});
