const express = require('express');

const { Booking, User, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all bookings of the current user:
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: { model: SpotImage }
        }
    });

    // Convert list to POJO:
    let bookingsList = [];
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON());
    });

    bookingsList.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                booking.Spot.previewImage = image.url;
            }
        });
        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = 'No preview image found'
        }
        delete booking.Spot.SpotImages;
    });

    res.json({ Bookings: bookingsList });
});

module.exports = router;
