const ReviewService = require("./reviews.service");
const asyncErrorBoundary = require(".././errors/errorBoundary");
const treeize = require("../utils/treeize");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const error = { status: 404, message: `Review cannot be found.` }
    const review = await ReviewService.getReviewById(reviewId);
  
    if (!review) {
        next(error)
    } else {
        res.locals.review = review;
        return next();
    }

}
async function update(req, res, next) {
    //const { reviewId } = req.params;
    const {
        review: { review_id: reviewId, ...review },
    } = res.locals;
    
    const updateReview = {...review, ...req.body}
    //const updateReview = { score: req.body.score, content: req.body.content };
    const updatedReview = await ReviewService.updateReview(updateReview, reviewId)
    const getReviewsAndCritics = await ReviewService.joinReviewsAndCritics(reviewId)
    const reviewsAndCritics = treeize(getReviewsAndCritics)
      res.json({ data: reviewsAndCritics[0]});
}
async function destroy(req, res, next) {
    const { review } = res.locals;
    await ReviewService.deleteReviewById(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}