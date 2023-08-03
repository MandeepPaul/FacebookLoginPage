const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  md5 = require("md5"),
  path = require("path");

// Import the SecureLoginUsers model if needed
const SecureLoginUsers = require("../models/uCredentials");

module.exports = function (app) {
  router.get(["/", "/login"], function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  function checklogin(req, res, user, password) {
    SecureLoginUsers.findOne({ uname: user }, function (err, resultFound) {
      if (err) {
        return res.status(400).json({ error: err });
      }

      password = md5(password); // Encrypt password

      if (resultFound != null && resultFound.pass === password) {
        req.session.userName = req.body.uname;
        res.redirect(303, "/home");
      } else {
        res.redirect(
          303,
          "/?error=Username or password do not match our records. Please try again or register if you are a new user!"
        );
      }
    });
  }

  router.post("/processLogin", function (req, res) {
    // Determine if user is login or registering
    if (req.body.buttonVar == "login") {
      checklogin(req, res, req.body.uname.trim(), req.body.pword.trim());
    } else {
      res.redirect(303, "register");
    }
  });

  router.post("/processReg", async function (req, res) {
    const user = new SecureLoginUsers(req.body);

    const passwordsMatch = req.body.pword.trim() === req.body.pword2.trim();
    const isPasswordEmpty = req.body.pword === "";

    // Check if the passwords match and are not empty
    if (passwordsMatch && !isPasswordEmpty) {
      user.pass = md5(req.body.pword);

      try {
        // Find the number of users in the database
        const userCount = await SecureLoginUsers.countDocuments({});

        console.log("The number of users was " + userCount);

        // Find all users in the database
        const resultArray = await SecureLoginUsers.find({});

        // Check if the provided username already exists in the database
        const usernameExists = resultArray.some(
          (element) => element.uname === req.body.uname
        );

        if (usernameExists) {
          // Username already exists, send an error message
          return res.redirect(
            "/register?error=User already exist! Try with a different username"
          );
        }

        // Username is unique, save the new user to the database
        user.save((err, toDB) => {
          if (err) {
            return res.status(400).json({ error: err });
          }
          req.session.userName = req.body.uname;
          res.redirect(303, "/home");
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    } else {
      res.redirect(
        303,
        "/register?error=Password do not match! Please try again."
      );
    }
  });

  router.get("/home", function (req, res) {
    if (req.session.userName) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    } else {
      res.redirect("/login?error=Please login to access the home page");
    }
  });

  router.get("/page2", function (req, res) {
    if (req.session.userName) {
      res.sendFile(path.join(__dirname, "../public/page2.html"));
    } else {
      res.redirect("/login?error=Please login to access the second page");
    }
  });

  router.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  router.get("/logout", function (req, res) {
    delete req.session.userName;
    res.redirect(303, "/");
  });

  return router;
};
