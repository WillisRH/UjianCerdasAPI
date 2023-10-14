const mongoose = require("mongoose");

const MapelSchema = new mongoose.Schema({
    mapelid: {
      type: Number,
    },
    mapelname: {
      type: String,
    },
    owner: {
      type: Number,
    },
    quiz: [{ type: String }],
    mapeluser: [{ type: String }], // Change choice to choices and make it an array of strings
    blocked: {
      type: Boolean,
      default: false
    },
});

const mapel = mongoose.model('Mapel', MapelSchema);


module.exports = { mapel };
