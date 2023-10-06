const mongoose = require("mongoose");

const ExamsSchema = new mongoose.Schema({
    questionid: {
      type: Number,
    },
    questionnumber: {
      type: Number,
    },
    question: {
      type: String,
    },
    choices: [{ type: String }], // Change choice to choices and make it an array of strings
    answer: {
      type: String,
    },
    isEssay: {
      type: Boolean,
    }
});

const Exam = mongoose.model('Exam', ExamsSchema);


module.exports = { Exam };
