(function() {
    'use strict';

    let express = require('express');
    let bodyParser = require('body-parser');
    let mongoose = require('mongoose');
    let app = express();
    let Question = require('./models/question');

    // Configure app to user body-parser
    // which will let us get data from post
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Connect to mongoose
    mongoose.connect('localhost:27017/quizapi');

    const port = process.env.PORT || 8080;

    // Routes
    let router = express.Router();

    // Middlewares
    router.use(function(req, res, next) {
        console.log('Called endpoint');
        next();
    });

    router.get('/', (req, res) => {
        res.json({message: 'Welcome to quz api!'});
    });

    router.route('/questions')
    .post(function(req, res) {
        let question = new Question();
        question.answer = req.body.answer;
        question.value = req.body.value;
        question.question = req.body.question;
        question.categoryName = req.body.categoryName;

        question.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Question created!'});
        });
    })
    .get(function(req, res) {
        Question.find(function(err, qs) {
            if(err) {
                res.send(err);
            }
            res.json(qs);
        });
    });

    router.route('/questions/:question_id')
    .get(function(req, res) {
        Question.findById(req.params.question_id, function(err, q) {
            if(err) {
                res.send(err);
            }
            res.json(q);
        });
    });

    // Register routes
    // all routes will be prefixed with /api
    app.use('/api', router);

    app.listen(port, function() {
        console.log('Quiz API started');
    });
}());