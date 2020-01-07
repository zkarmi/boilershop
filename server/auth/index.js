/* eslint-disable nonblock-statement-body-position */
const auth = require("express").Router();
const Customer = require("../db/customer");
const passport = require("passport");

auth.post("/login", (req, res, next) => {
  Customer.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send("User not found");
      else if (!user.correctPassword(req.body.password))
        res.status(401).send("Invalid password");
      else
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
    })
    .catch(next);
});

auth.post("/signup", (req, res, next) => {
  Customer.create(req.body)
    .then(customer => {
      req.login(customer, err => {
        if (err) next(err);
        else res.json(customer);
      });
    })
    .catch(next);
});

auth.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

auth.get("/me", (req, res, next) => {
  res.json(req.user);
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(
  token,
  refreshToken,
  profile,
  done
) {
  const googleId = profile.id;
  const name = profile.displayName;
  console.log(profile);
  const email = profile.emails[0].value;

  Customer.findOne({ where: { googleId: googleId } })
    .then(function(user) {
      if (!user) {
        return Customer.create({ name, email, googleId }).then(function(user) {
          done(null, user);
        });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

auth.get("/google", passport.authenticate("google", { scope: "email" }));

auth.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

module.exports = auth;
