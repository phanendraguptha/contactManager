var mongoose = require("mongoose");
require('mongoose-type-email');

var contactSchema = mongoose.Schema({
  name: String,
  dob: String,
  phone1: Number,
  phone2: Number,
  // phone2: {type:Number,allowBlank: true},
  email: mongoose.SchemaTypes.Email
});

var Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;