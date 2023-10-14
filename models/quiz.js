const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    mapelid: {
      type: Number,
    },
    owner: {
      type: String,
    },
    creator: {
        type: String
    },
    open: {
        type: String
    },
    close: {
        type: String
    },
    quiztime: {
        type: String
    },
    blocked: {
        type: Boolean,
        default: false
    },
    reattemptquestion: [
        [{ type: String }]
       ],
     reattempteduser: [
        [{type: String}]
       ]


});

const quiz = mongoose.model('Quiz', QuizSchema);


module.exports = { quiz };
