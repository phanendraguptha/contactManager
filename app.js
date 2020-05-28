const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {
  res.render("index");
})

app.get("/addContact", (req, res) => {
  // res.send("hello");
  res.render("add");
})

app.get("/editContact", (req, res) => {
  res.render("edit");
})

app.listen(port, () => {
  console.log(`running on port ${port}`);
})