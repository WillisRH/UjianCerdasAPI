const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
    questionid: {
      type: Number,
    },
    owner: {
      type: String,
    },
    quiz: [{ type: String }], // Change choice to choices and make it an array of strings
    blocked: {
      type: Boolean,
      default: false
  }
});

const questions = mongoose.model('Question', QuestionsSchema);


module.exports = { questions };
