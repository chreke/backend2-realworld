const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  token: { type: String, default: "" }, //FIX THIS
});

userSchema.pre("save", async function (next) {
  user = this
  if (this.modifiedPaths().includes("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } 
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } 
  return null;
};
const updateProfile = async (user) => {
  if(user.password){ 
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash
  }
  const result = await User.findOneAndUpdate({email: user.email}, user, {new: true}).select({password: false, _id: false})
  return result
}
const User = mongoose.model("User", userSchema);
module.exports = {User, updateProfile};
