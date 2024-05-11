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
    answers: {type: [String]},
    eValue: {type: Number},
    numberOfAnsweredQuestions: {type: Number},
    numberOfSkippedQuestions: {type: Number},
    result: {type: String},
    skippedQuestions: {type: [String]},
    totalPossibleEvalue: {type: Number},
    totalQuestions: {type: Number},
    percentageCorrectAnswers: {type: String},
    percentageSkippedQuestions: {type: String}
});

module.exports = mongoose.model("Employee", employeeSchema);