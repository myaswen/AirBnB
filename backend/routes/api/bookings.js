const express = require('express');

const { Booking, User, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Check for date conflicts helper function:
let dateConflict = (startDate, endDate, bookings, bookingId) => {
    let conflictErrors = {};

    // Convert list to POJO:
    let bookingsList = [];
    bookings.forEach(booking => {
        if (booking.id != bookingId) {
            bookingsList.push(booking.toJSON());
        }
    });

    bookingsList.forEach(booking => {
        if (startDate >= booking.startDate && startDate <= booking.endDate) {
            conflictErrors.startDate = "Start date conflicts with an existing booking";
        }
        if (endDate <= booking.endDate && endDate >= booking.startDate) {
            conflictErrors.endDate = "End date conflicts with an existing booking";
        }
        if (startDate < booking.startDate && endDate > booking.endDate) {
            conflictErrors.overlap = "Dates overlap an existing booking";
        }
    });

    return conflictErrors;
}

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

// Edit a booking:
router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot,
            include: {
                model: Booking
            }
        }
    });
    const currentDate = new Date();
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (!booking) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Booking couldn't be found";
        next(err);
    } else if (req.user.id !== booking.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Action";
        err.message = "User is not authorized to modify this booking"
        next(err);
    } else if (booking.endDate <= currentDate) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Action";
        err.message = "Past bookings can't be modified"
        next(err);
    } else if (startDate >= endDate) {
        const err = new Error("Validation");
        err.status = 400;
        err.title = "Validation Error";
        err.message = "Validation Error";
        err.errors = {
            endDate: "endDate cannot be on or before startDate"
        };
        next(err);
    } else {
        let bookingConflict = dateConflict(startDate, endDate, booking.Spot.Bookings, req.params.bookingId);
        if (bookingConflict.startDate || bookingConflict.endDate || bookingConflict.overlap) {
            const err = new Error("Forbidden");
            err.status = 403;
            err.title = "Booking conflict";
            err.message = "Sorry, this spot is already booked for the specified dates";
            err.errors = {};
            if (bookingConflict.startDate) err.errors.startDate = bookingConflict.startDate;
            if (bookingConflict.endDate) err.errors.endDate = bookingConflict.endDate;
            if (bookingConflict.overlap) err.errors.overlap = bookingConflict.overlap;
            next(err);
        } else {
            await booking.update({
                startDate: req.body.startDate,
                endDate: req.body.endDate
            });
            updatedBooking = booking.toJSON();
            delete updatedBooking.Spot;
            res.json(updatedBooking)
        }
    }
});

module.exports = router;
