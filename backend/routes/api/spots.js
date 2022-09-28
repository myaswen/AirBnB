const express = require('express');

const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

let aggregateSpotData = (spots) => {

    // Convert the 'spots' promise to a POJO:
    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    });

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        });
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }
        delete spot.SpotImages;
    });

    spotsList.forEach(spot => {
        let starsSum = 0;
        let starsCount = 0;

        spot.Reviews.forEach(review => {
            starsSum += parseInt(review.stars);
            starsCount++;
        });

        if (starsCount > 0) {
            spot.avgRating = starsSum / starsCount;
        } else {
            spot.avgRating = "No rating"
        }

        delete spot.Reviews;
    });

    return spotsList;
};

// Get all spots:
router.get('/', async (req, res) => {

    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });

    res.json({ Spots: aggregateSpotData(spots) });
});

// Get all spots owned by the current User:
router.get('/current', requireAuth, async (req, res) => {

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });

    res.json({ Spots: aggregateSpotData(spots) });
});

// Get spot details by spot id:
router.get('/:spotId', requireAuth, async (req, res) => {

    let spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: Review },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        });
    }

    spot = spot.toJSON();

    let starsSum = 0;
    let starsCount = 0;

    spot.Reviews.forEach(review => {
        starsSum += parseInt(review.stars);
        starsCount++;
    });

    if (starsCount > 0) {
        spot.avgStarRating = starsSum / starsCount;
    } else {
        spot.avgStarRating = "No rating"
    }

    spot.numReviews = starsCount;
    delete spot.Reviews;

    spot.Owner = spot.User;
    delete spot.User;

    res.json(spot);
});

module.exports = router;
