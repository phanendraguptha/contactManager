const express = require('express'),
  methodOverride = require('method-override'),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require('body-parser'),
  Contact = require("./models/Contact");

require('dotenv').config();

const port = process.env.PORT || 3000;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'))

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.log(err);
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

app.set('view engine', 'ejs');

// index
app.get("/", (req, res, next) => {
  Contact.find({}, (err, foundData) => {
    if (err) console.log("error", err);
    // else res.send(foundData);
    else res.render("index", { datas: foundData });
  })
})

// add
app.get("/addContact", (req, res) => {
  res.render("add");
})
app.post("/add", (req, res) => {
  Contact.create(req.body, (err, data) => {
    if (err) {
      res.redirect("/addContact");
    }
    else {
      res.redirect("/");
    }
  })
})

// edit
app.get("/editContact/:id", (req, res) => {
  Contact.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.redirect("/addContact");
    }
    else {
      res.render("edit", { data: data });
    }
  })
})

app.listen(port, () => {
  console.log(`running on port ${port}`);
})