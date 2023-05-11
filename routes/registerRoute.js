const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../schemas/user.js");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
  var username = req.body.username.trim();
  var email = req.body.email.trim();
  var password = req.body.password;

  var payload = req.body;

  console.log(payload);
  if (firstname && lastname && email && password && username) {
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = "fill the form";
      res.status(200).render("register", payload);
      
    });
    if (user == null) {
      //    no user found
      let data = req.body;
      User.create(data).then((user) => {
        console.log(user);
      });
    } else {
      if (email == user.email) {
        payload.errorMessage = "email already exist";
        console.log("email already exist");
      } else {
        payload.errorMessage = "user already exist";
        console.log("user already exist");
      }
    }
    console.log(user);
    console.log("first");
  } else {
    payload.errorMessage = "fill the form";
    res.status(200).render("register", payload);
  }
  // console.log(req.body)
});
module.exports = router;