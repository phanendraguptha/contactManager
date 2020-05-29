const express = require('express'),
  methodOverride = require('method-override'),
  app = express(),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  bodyParser = require('body-parser'),
  Contact = require("./models/Contact"),
  session = require("express-session");

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

app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());

// index
app.get("/", (req, res, next) => {
  // eval(require('locus'));
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Contact.find({ name: regex }).sort('name').exec((err, foundData) => {
      if (err) console.log(err);
      else res.render("index", { datas: foundData, page: 1, active: "active" });
    })
  }
  else if (req.query.page) {
    const page = req.query.page - 1;
    const offset = page * 4;
    Contact.find({}).sort('name').skip(offset).limit(4).exec((err, foundData) => {
      if (err) console.log(err);
      else res.render("index", { datas: foundData, page: page + 1, active: "active" });
    })
  }
  Contact.find({}).sort('name').limit(4).exec((err, foundData) => {
    if (err) console.log(err);
    else res.render("index", { datas: foundData, page: 1, active: "active" });
  })
})

// add
app.get("/addContact", (req, res) => {
  res.render("add", { message: req.flash("error") });
})
// add handler
app.post("/add", (req, res) => {
  Contact.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
      req.flash("error", "please fill all required fields & phone no should be unique");
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
// update
app.put("/update/:id", (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, function (err, updatedData) {
    if (err) {
      res.redirect("back");
    }
    else {
      res.redirect("/");
    }
  });
})
// delete
app.delete("/delete/:id", (req, res) => {
  Contact.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err)
      console.log(err);
    else
      res.redirect("/");
  })
})

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.listen(port, () => {
  console.log(`running on port ${port}`);
})