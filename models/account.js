const mongoose = require("mongoose");

const schema = mongoose.Schema;
const userSchema = new schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    special: Boolean,
    createdAt: String,
  });
  
  const user = mongoose.model("user", userSchema);

  module.exports = { user }