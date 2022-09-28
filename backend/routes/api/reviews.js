const express = require('express');

const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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

module.exports = router;
