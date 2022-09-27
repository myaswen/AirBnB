const express = require('express');

const { Spot, SpotImage, Review, sequelize } = require('../../db/models');

const router = express.Router();

// Get all spots:
router.get('/', async (req, res) => {
    const response = { Spots: [] };

    const allSpots = await Spot.findAll();

    for (let currentSpot of allSpots) {
        let { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = currentSpot;
        const aggregateSpotData = { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt };

        const spotData = await Spot.findByPk(currentSpot.id, {
            include: [
                { model: Review },
                { model: SpotImage }
            ],
            attributes: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        });

        aggregateSpotData.avgRating = spotData.dataValues.avgRating;

        for (let image of spotData.dataValues.SpotImages) {
            if (image.preview === true) {
                aggregateSpotData.previewImage = image.url;
            }
        }

        response.Spots.push(aggregateSpotData);
    }

    return res.json(response);
});

module.exports = router;
