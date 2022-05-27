module.exports = (app) => {
    const reviews = require('../controllers/review.controller.js');

    // Create a new review
    app.post('/reviews', reviews.create);

    // Retrieve all reviews
    app.get('/reviews', reviews.findAll);

    // Retrieve a single review with reviewId
    app.get('/reviews/:reviewId', reviews.findOne);

    // Update a review with reviewId
    app.put('/reviews/:reviewId', reviews.update);

    // Delete a review with reviewId
    app.delete('/reviews/:reviewId', reviews.delete);
}