var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');

let { Customers, Accounts, Transactions, TransactionTypes } = require('../models');


router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      req.logIn(user, error => {
        console.log(user);
        const data = {
          name: req.body.name,
          phone: req.body.phone,
          email: user.email,
        };
        console.log(data);
        Customers.findOne({
          where: {
            email: data.email,
          },
        }).then(user => {
          console.log(user);
          user
            .update({
              name: data.name,
              phone: data.phone,
            })
            .then(() => {
              console.log('user created in db');
              res.status(200).send({ message: 'user created' });
            });
        });
      });
    }
  })(req, res, next);
});


router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === 'username not exist') {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(user, err => {
        Customers.findOne({
          where: {
            email: req.body.email,
          },
        }).then(user => {
          const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 60 * 60,
          });
         
          res.status(200).send({
            auth: true,
            token,
            message: 'user found & logged in'
          });
        });
      });
    }
  })(req, res, next);
})


router.get('/findcustomer',(req, res, next) =>{
  passport.authenticate('jwt', { session: false }, (err, user, info)=> {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message)
    } else {
      res.status(200).send({
        auth: true,
        name: user.name,
        phone: user.phone,
        userId: user.id,
        email: user.email,
        password: user.password,
        nmessage: "welcome " + user.name
      });
    }
  })(req, res, next);
})

router.get('/findaccountsbycustomer',(req, res, next) =>{
  passport.authenticate('jwt-accounts', { session: false }, (err, accounts, info)=> {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message)
    } else {

      res.status(200).send({
        accounts
      });
    }
  })(req, res, next);
})

router.post('/createAccount',(req, res, next) =>{
  passport.authenticate('jwt', { session: false }, async (err, user, info)=> {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message)
    } else {
      if (req.body.CustomerId === user.id){
        let account = await Accounts.create(req.body)
        res.status(201).send(
          account
        )
      } else {
        res.status(403).send("wrong customerID")
      }
    }
  })(req, res, next);
})

router.get('/findtransbycustomer',(req, res, next) =>{
  passport.authenticate('jwt-trans', { session: false }, (err, trans, info)=> {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message)
    } else {

      res.status(200).send({
        trans
      });
    }
  })(req, res, next);
})

router.post('/createTrans',(req, res, next) =>{
  passport.authenticate('jwt', { session: false }, async (err, user, info)=> {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message)
    } else {
        await Accounts.findOne({
              raw:true,
              attributes: ['CustomerId'],
              where: {id: req.body.AccountId},
            }).then(async account=> {
              if(account.CustomerId === user.id){
                let amount = await req.body.amount;
                let transactionType = await TransactionTypes.findOne({where: {id: req.body.TransactionTypeId}});
                console.log(transactionType);
                switch(transactionType.description){
                  case "deposit":
                    await Accounts.increment('available_balance', {by: amount, where: {id:req.body.AccountId}});
                    break;
                  case "withdraw": 
                    await Accounts.increment('available_balance', {by: -amount, where: {id:req.body.AccountId}});
                    break;
                  case "credit_card_charge":
                    await Accounts.increment({current_balance: amount, available_credit: -amount}, {where: {id:req.body.AccountId}});
                    break;
                  case "pay_credit_card":
                    await Accounts.increment({current_balance: -amount, available_credit: amount}, {where: {id:req.body.AccountId}});
                    break;
                  default:
                    break;
                };
                let trans = await Transactions.create(req.body);
                await res.status(201).send(trans);
              } else {
                res.status(403).send('wrong accuntId') }
            });

    }
  })(req, res, next);
})

module.exports = router;