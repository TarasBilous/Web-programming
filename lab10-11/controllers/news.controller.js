var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var News = require('./news.model');

router.post('/create', function (req, res) {
    News.create({
            title : req.body.title,
            text : req.body.text,
            image: req.body.image
        }, 
        function (err, news) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(news);
        });
});

router.get('/get-data', function (req, res) {
    News.find({}, function (err, newss) {
        if (err) return res.status(500).send("There was a problem finding the newss.");
        res.status(200).send(newss);
    });
});

router.get('/:id', function (req, res) {
    News.findById(req.params.id, function (err, news) {
        if (err) return res.status(500).send("There was a problem finding the news.");
        if (!news) return res.status(404).send("No user found.");
        res.status(200).send(news);
    });
});

router.delete('/:id', function (req, res) {
    News.findByIdAndRemove(req.params.id, function (err, news) {
        if (err) return res.status(500).send("There was a problem deleting the news.");
        res.status(200).send("News: "+ news.name +" was deleted.");
    });
});

router.put('/:id', function (req, res) {
    News.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, news) {
        if (err) return res.status(500).send("There was a problem updating the news.");
        res.status(200).send(news);
    });
});


module.exports = router;