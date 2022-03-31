const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
<<<<<<< HEAD
    type: String
  },  
  image: {
    type: String, 
    default: "/images/profilePic.jpg"
  },
=======
    type: String, 
    
  },
  image: {
    type: String,
    default:"kalleking"
  }
>>>>>>> 1c8064f97959773ed4dba8e8b3a3edcd2948a982
});
userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

exports.User = User;
