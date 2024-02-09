const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    mapelid: {
      type: Number,
    },
    owner: {
      type: Number,
    },
    quizname: {
        type: String
    },
    quizid: {
        type: Number,
    },
    creator: {
        type: Number
    },
    open: {
        type: String,
        default: null
    },
    close: {
        type: String,
        default: null
    },
    quiztime: {
        type: String,
        default: null
    },
    blocked: {
        type: Boolean,
        default: false
    },
    reattemptquestionid: [
        [{ type: String }]
       ],
     


});

const quiz = mongoose.model('Quiz', QuizSchema);


module.exports = { quiz };
