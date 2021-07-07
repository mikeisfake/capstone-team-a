var express = require('express');
var router = express.Router();
var {Customers, Accounts, Transactions, TransactionTypes, AccountTypes} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/customer', async function(req, res, next) {
  let customers= await Customers.create(req.body);
  res.json(customers);
})

router.get('/customer', async function(req, res, next) {
  let customers= await Customers.findAll();
  res.json(customers);
})

router.post('/accounttypes', async function(req, res, next) {
  let atypes= await AccountTypes.create(req.body);
  res.json(atypes);
})

router.get('/accounttypes', async function(req, res, next) {
  let atypes= await AccountTypes.findAll();
  res.json(atypes);
})

router.post('/transtypes', async function(req, res, next) {
  let ttypes= await TransactionTypes.create(req.body);
  res.json(ttypes);
})

router.get('/transtypes', async function(req, res, next) {
  let ttypes= await TransactionTypes.findAll();
  res.json(ttypes);
})

//These following endpoints are only used for input dummy data in dev, it can't be use 
//in production for security reason.

// router.get('/customer/:id/accounts', async function(req, res, next) {
//   let accounts = await Accounts.findAll({where: {CustomerId:req.params.id}, include: [Customers, AccountTypes]})
//   res.json(accounts);
// });

// router.post('/customer/:id/accounts', async function(req, res, next) {
//   let account = await Accounts.create(req.body);
//   res.json(account);
// });

// router.get('/account/:id', async function(req, res, next) {
//   let account = await Accounts.findAll({where:{id:req.params.id}, include: [Customers, AccountTypes]});
//   res.json(account);
// })

// router.get('/account/:id/transactions', async function(req, res, next) {
//   let transactions = await Transactions.findAll({where: {AccountId:req.params.id}, include: [Accounts, TransactionTypes]})
//   res.json(transactions);
// });

// router.post('/account/:id/transactions', async function(req, res, next) {
//   let amount = await req.body.amount;
//   let transactionType = await TransactionTypes.findOne({where: {id: req.body.TransactionTypeId}});
//   switch(transactionType.description){
//     case "deposit":
//       await Accounts.increment('available_balance', {by: amount, where: {id:req.params.id}});
//       break;
//     case "withdraw": 
//       await Accounts.increment('available_balance', {by: -amount, where: {id:req.params.id}});
//       break;
//     case "credit_card_charge":
//       await Accounts.increment({current_balance: amount, available_credit: -amount}, {where: {id:req.params.id}});
//       break;
//     case "pay_credit_card":
//       await Accounts.increment({current_balance: -amount, available_credit: amount}, {where: {id:req.params.id}});
//       break;
//     default:
//       break;
//   }
//   let transaction = await Transactions.create(req.body);
  
//   res.json(transaction);
// });

// router.get('/transaction/:id', async function(req, res, next) {
//   let transaction = await Transactions.findAll({where:{id:req.params.id}, include: [Accounts, TransactionTypes]});
//   res.json(transaction);
// })

module.exports = router;