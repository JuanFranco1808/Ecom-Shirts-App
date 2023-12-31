const express = require("express");

const authRouter = express.Router();
const { models } = require("../libs/sequelize");
const passport = require("passport");

//RUTAS
authRouter
  .route("/signup")
  .get((req, res) => {
    res.render("auth/signup");
  })
  .post(async (req, res) => {
    //Crear usuario en BD
    const user = await models.user.create(req.body);
    console.log(user);
    //Autenticar
    req.login(user, () => {
      res.redirect("/");
    });
  });

authRouter
  .route("/signin")
  .get((req, res) => {
    res.render("auth/signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/signin",
      keepSessionAlive: true,
    })
  );

module.exports = authRouter;
