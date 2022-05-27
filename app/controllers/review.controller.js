const Review = require('../models/review.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.userid) {
        return res.status(400).send({
            message: "review content can not be empty"
        });
    }

    // Create a review
    const review = new Review({
        userid: req.body.userid || "Untitled review",
        description: req.body.description || "0"
    });

    // Save review in the database
    review.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the review."
        });
    });
};

// Retrieve and return all reviews from the database.
exports.findAll = (req, res) => {
    Review.find()
    .then(reviews => {
        res.send(reviews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews."
        });
    });
};

// Find a single review with a reviewId
exports.findOne = (req, res) => {
    Review.findById(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });            
        }
        res.send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving review with id " + req.params.reviewId
        });
    });
};

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.userid) {
        return res.status(400).send({
            message: "review content can not be empty"
        });
    }

    // Find review and update it with the request body
    Review.findByIdAndUpdate(req.params.reviewId, {
        userid: req.body.userid || "Untitled review",
        description: req.body.description || "0"
    }, {new: true})
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });
        }
        res.send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Error updating review with id " + req.params.reviewId
        });
    });
};

// Delete a review with the specified reviewId in the request
exports.delete = (req, res) => {
    Review.findByIdAndRemove(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });
        }
        res.send({message: "review deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Could not delete review with id " + req.params.reviewId
        });
    });
};