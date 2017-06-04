var mongoose = require('mongoose');

var Word = mongoose.model('Word', {
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  latestDate: {
    type: Number,
    default: null
  }
});

module.exports = {Word};
