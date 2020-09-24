const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Home
// @route   GET /home
router.get("/home", ensureAuth, async (req, res) => {
  try {
    res.render("home", {
      name: req.user.firstName,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

router.get("/pvpc", ensureAuth, async (req, res) => {
  try {
    res.render("pvpc", {
      name: req.user.firstName,
      inGame: true,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
router.get("/pvp", ensureAuth, async (req, res) => {
  try {
    res.render("pvp", {
      name: req.user.firstName,
      inGame: true,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
