const express = require('express'),
  path = require('path')
xss = require('xss'),
  northArkService = require('./northArk-service'),
  northArkRouter = express.Router(),
  jsonParser = express.json();

northArkRouter
  .route('/')
  .get((req, res, next) => {

  })
  .post(jsonParser, (req, res, next) => {

  });

northArkRouter
  .route('/:')

  .all((req, res, next) => {

  })

  .get((req, res, next) => {

  })

  .patch(jsonParser, (req, res, next) => {

  })

  .delete((req, res, next) => {

  })

module.exports = northArkRouter