'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    answer: String,
    question: String,
    value: Number,
    categoryName: String,
});

module.exports = mongoose.model('Question', QuestionSchema);
