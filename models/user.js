const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, default: "" },
  bio: { type: String },
  image: { type: String }
});

userSchema.pre(
  'save',
  async function (next) {
    if (this.modifiedPaths().includes("password")) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    next();
  }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
