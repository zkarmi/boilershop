/* eslint-disable nonblock-statement-body-position */
const auth = require('express').Router();
const Customer = require('../db/customer');

auth.post('/login', (req, res, next) => {
  Customer.findOne({
    where: {
      email: req.body.email
    }
  })
    .then( user => {
      if(!user)
        res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password))
        res.status(401).send('Invalid password');
      else
        req.login( user, err => {
          if (err) next(err);
          else res.json(user);
        })
    })
    .catch( next );
});

auth.post('/signup', (req, res, next) => {
  Customer.create(req.body)
    .then( customer => {
      req.login( customer, err => {
        if (err)
          next(err);
        else
          res.json(customer);
      })
    })
    .catch( next );
})

auth.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
})

auth.get('/me', (req, res, next) => {
  res.json(req.user);
})

module.exports = auth;
