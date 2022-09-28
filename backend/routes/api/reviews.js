const express = require('express');

const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get current user's reviews:
router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: { model: SpotImage }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    // Convert the 'reviews' promise to a POJO:
    let reviewsList = []
    reviews.forEach(review => {
        reviewsList.push(review.toJSON());
    });

    reviewsList.forEach(review => {
        review.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                review.Spot.previewImage = image.url;
            }
        });
        if (!review.Spot.previewImage) {
            review.Spot.previewImage = "No preview image found";
        }
        delete review.Spot.SpotImages;
    });

    res.json({ Reviews: reviewsList });
});

// Add an image to a review by review id:
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const user = await User.findByPk(req.user.id);
    const review = await Review.findByPk(req.params.reviewId, {
        include: {
            model: ReviewImage
        }
    });

    let imageMaxReached = (user, review) => {
        let count = 0;
        review = review.toJSON();

        for (let image of review.ReviewImages) count++;
        if (count >= 10) return true;

        return false;
    };

    if (!review) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Review couldn't be found"
        next(err);
    } else if (user.id != review.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else if (imageMaxReached(user, review)) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Error";
        err.message = "Maximum number of images for this resource was reached"
        next(err);
    } else {
        const image = await review.createReviewImage({
            url: req.body.url
        });

        res.json({
            id: image.id,
            url: image.url
        });
    }
});

// Edit a review by review id:
router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const user = await User.findByPk(req.user.id);
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Review couldn't be found"
        next(err);
    } else if (user.id != review.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else {
        await review.update({
            review: req.body.review,
            stars: req.body.stars
        });

        res.json(review);
    }
});

module.exports = router;
