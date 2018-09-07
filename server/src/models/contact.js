const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  city: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  company: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Contact', ContactSchema)
