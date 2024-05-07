const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    answerId: {type: String},
    createdAt: {type: String},
    table1Evalue: {type: Number},
    table1Choices: { type: [String]},
    table2Evalue: {type: Number},
    table2Choices: { type:[String]},
    gender: {type: String},
    age: {type: String},
    location: {type: String},
    education: {type: String},
    employment: {type: String},
    table1Result: {type: String},
    table2Result: {type: String}
});

module.exports = mongoose.model("Manager", managerSchema);