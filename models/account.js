const mongoose = require("mongoose");

const schema = mongoose.Schema;
const userSchema = new schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    usertype : {
      type : String,
      enum : ['TEACHER', 'STUDENT'],
      default: 'STUDENT',
      required : true 
    },
    quiz: {
      id: { type: String, default: null },
      isplaying: { type: Boolean, default: false },
    },    
    blocked : {
      type : Boolean,
      default : false
    },
    reattemptedquiz: [
      [{type: String,
        default: null
      }],
     ],
    createdAt: String,
  });
  
  const user = mongoose.model("User", userSchema);

  module.exports = { user }