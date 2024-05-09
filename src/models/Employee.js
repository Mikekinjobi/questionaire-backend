const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    answerId: {type: String},
    createdAt: {type: String},
    gender: {type: String},
    age: {type: String},
    location: {type: String},
    education: {type: String},
    employment: {type: String},
    timeSpent: {type: String},
    managerId: {type: String},
    answers: {type: [[String, Number]]}
});

module.exports = mongoose.model("Employee", employeeSchema);