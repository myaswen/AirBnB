const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// Booking date conflict checker:
const dateConflict = (startDate, endDate, bookings, currentBookingId) => {
    let conflictErrors = {};

    bookings.forEach(booking => {
        if (booking.id != currentBookingId) {
            if (startDate >= booking.startDate && startDate <= booking.endDate) {
                conflictErrors.startDate = "Start date conflicts with an existing booking";
            }
            if (endDate <= booking.endDate && endDate >= booking.startDate) {
                conflictErrors.endDate = "End date conflicts with an existing booking";
            }
            if (startDate < booking.startDate && endDate > booking.endDate) {
                conflictErrors.overlap = "Dates overlap an existing booking";
            }
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

    // Convert 'bookings' to a plain object:
    let bookingsList = [];
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON());
    });

    // Find and set the preview image for each spot:
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

    const currentDate = new Date();
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot,
            include: {
                model: Booking
            }
        }
    });


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
        err.errors = { endDate: "endDate cannot be on or before startDate" };
        next(err);
    } else {
        let bookingConflict = dateConflict(startDate, endDate, booking.Spot.Bookings, req.params.bookingId);
        if (Object.keys(bookingConflict).length) {
            const err = new Error("Forbidden");
            err.status = 403;
            err.title = "Booking conflict";
            err.message = "Sorry, this spot is already booked for the specified dates";
            err.errors = {
                startDate: bookingConflict.startDate,
                endDate: bookingConflict.endDate,
                overlap: bookingConflict.overlap,
            };
            next(err);
        } else {
            await booking.update({
                startDate,
                endDate
            });

            updatedBooking = booking.toJSON();
            delete updatedBooking.Spot;
            res.json(updatedBooking)
        }
    }
});

// Delete a booking:
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const currentDate = new Date();

    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot
        }
    });

    if (!booking) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Booking couldn't be found";
        next(err);
    } else if (req.user.id != booking.userId && req.user.id != booking.Spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Action";
        err.message = "User is not authorized to delete this booking"
        next(err);
    } else if (booking.startDate <= currentDate) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Action";
        err.message = "Bookings that have been started can't be deleted"
        next(err);
    } else {
        await booking.destroy();
        res.json({
            message: 'Successfully deleted',
            statusCode: res.statusCode
        });
    }
});

module.exports = router;
