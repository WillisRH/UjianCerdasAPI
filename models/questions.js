const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
    questionid: {
      type: Number,
    },
    quizid: {
      type: Number,
    },
    owner: {
      type: Number,
    },
    question: {
      type: String,
    },
    questionmediabase64: {
      type: String,
    },
    choise: [{ type: String }], 
    blocked: {
      type: Boolean,
      default: false
  },
  hasmedia: {
    type: Boolean,
    default: false
}
});

const questions = mongoose.model('Question', QuestionsSchema);


module.exports = { questions };
