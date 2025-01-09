const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String
  },
  role: {
    type: String,
    required: false,
    default: "user"
  },
  profile_image : {
    type : String ,
    required : false,
  },
  course_details :{
      active_courses : {
        type :Array,
        required : true
      },
      upcoming_courses : {
        type : Array
      },
      completed : {
        type : Array
      }
  }
});

module.exports = mongoose.model('User', userSchema);
