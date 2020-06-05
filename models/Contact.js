var mongoose = require("mongoose");
require('mongoose-type-email');

var contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: String,
  phone1: {
    type: Number,
    required: true,
    unique: true
  },
  phone2: {
    type: Number,
    allowBlank: true
  },
  email1: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  email2: {
    type: mongoose.SchemaTypes.Email,
    allowBlank: true
  }
});

var Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;