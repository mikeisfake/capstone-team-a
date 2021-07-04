const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Customers } = require('../models');

passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false,
      },
      (req, username, password, done) => {
        console.log(username);
        console.log(req.body.email);
  
        try {
          Customers.findOne({
            where: {
               email: username,
            },
          }).then(user => {
            if (user != null) {
              console.log('email already taken');
              return done(null, false, {
                message: 'email already taken',
              });
            }
            bcrypt.hash(password, 10).then(hashedPassword => {
              Customers.create({
                email: username,
                password: hashedPassword,
              }).then(user => {
                console.log('user created');
                return done(null, user);
              });
            });
          });
        } catch (err) {
          return done(err);
        }
      },
    ),
  );


  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        try {
          Customers.findOne({
            where: {
                email: username
            },
          }).then(user => {
            if (user === null) {
              return done(null, false, { message: 'this email not exist' });
            }
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('user found & authenticated');
              return done(null, user);
            });
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );
  

  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET,
  };
  
  passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        Customers.findOne({
          where: {
            id: jwt_payload.id,
          },
        }).then(user => {
          if (user) {
            console.log('user found in db in passport');
            done(null, user);
          } else {
            console.log('user not found in db');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );