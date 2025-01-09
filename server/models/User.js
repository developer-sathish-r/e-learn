const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  basic_details : {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    branch: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone_number: {
      type: String
    },
    role: {
      type: String,
      required: false,
      default: "user"
    },
    profile_image: {
      name: {
        type: String,
        maxlength: 50,
      },
      uploaded_file: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  course_details: {
    active_courses: {
      type: Array,
      required: true
    },
    upcoming_courses: {
      type: Array
    },
    completed: {
      type: Array
    }
  }
});

module.exports = mongoose.model('User', userSchema);
