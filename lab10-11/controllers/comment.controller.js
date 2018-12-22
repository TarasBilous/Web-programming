var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Comment = require('./comment.model');

router.post('/create', function (req, res) {
    Comment.create({
            name : req.body.name,
            body : req.body.body
        }, 
        function (err, comment) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(comment);
        });
});

router.get('/get-data', function (req, res) {
    Comment.find({}, function (err, comments) {
        if (err) return res.status(500).send("There was a problem finding the comments.");
        res.status(200).send(comments);
    });
});

router.get('/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) return res.status(500).send("There was a problem finding the comment.");
        if (!comment) return res.status(404).send("No user found.");
        res.status(200).send(comment);
    });
});

router.delete('/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id, function (err, comment) {
        if (err) return res.status(500).send("There was a problem deleting the comment.");
        res.status(200).send("Comment: "+ comment.name +" was deleted.");
    });
});

router.put('/:id', function (req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, comment) {
        if (err) return res.status(500).send("There was a problem updating the comment.");
        res.status(200).send(comment);
    });
});


module.exports = router;