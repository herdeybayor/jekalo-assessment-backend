//Packages
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const _ = require("lodash");
//User Model
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//Mongoose Connection <<NOTE: Remember to create .env file and add DB_STRING>>
mongoose.connect(process.env.DB_STRING, () => {
  console.log("Connection to server successful");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Jekalo Assessment Backend" });
});

app.post("/api/user", (req, res) => {
  const newUser = new User({
    //Visit https://lodash.com to know more about lodash
    name_prefix: `${_.startCase(req.body.first_name).slice(0, 1)}${_.startCase(
      req.body.last_name
    ).slice(0, 1)}`,
    first_name: _.startCase(req.body.first_name),
    last_name: _.startCase(req.body.last_name),
    username: _.lowerCase(req.body.username),
    date_of_birth: _.kebabCase(req.body.date_of_birth),
  });
  newUser
    .save()
    .then((user) => {
      res.json({
        name_prefix: user.name_prefix,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        date_of_birth: user.date_of_birth,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

app.get("/api/users", (req, res) => {
  User.find()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/api/:username", (req, res) => {
  User.deleteOne({ username: req.params.username })
    .then(() => {
      res.json({ message: "You deleted the user successfully" });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}. Visit http://localhost:${PORT}`);
});
