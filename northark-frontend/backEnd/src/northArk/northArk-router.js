const express = require('express'),
  path = require('path')
  xss = require('xss'),
  northArkService = require('./northArk-service'),
  northArkRouter = express.Router(),
  jsonParser = express.json();

//this is a general idea of how to get user by id, need help with connecting the tables and return data (account, account_type, balance...etc.)

const serializeUser = user => ({
  id: user.id,
  the_user: xss(user.the_user),
  type: xss(user.type)
});

northArkRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    northArkService.getUserById(knexInstance)
      .then(user => {
        res.json(user.map(serializeUser));
      })
      .catch(next);
  })

northArkRouter
  .route('/:userid')
  .all((req, res, next) => {
    northArkService.getById(req.app.get('db'), req.params.userid)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: 'No matching user found' }
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(serializeUser(res.user));
  })

module.exports = northArkRouter