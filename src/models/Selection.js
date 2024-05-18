const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const selectionSchema = new Schema({
    index: {type: Number}
});

module.exports = mongoose.model("Selection", selectionSchema);