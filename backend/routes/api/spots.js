const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Aggregate spot data helper:
const aggregateSpotData = (spots) => {

    // Convert 'spots' to a plain object:
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
            spot.previewImage = "No preview image found";
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
            spot.avgRating = "No rating";
        }

        delete spot.Reviews;
    });

    return spotsList;
};

// Booking date conflict checker:
let dateConflict = (startDate, endDate, bookings) => {
    let conflictErrors = {};

    bookings.forEach(booking => {
        if (startDate >= booking.startDate && startDate <= booking.endDate) {
            conflictErrors.startDate = "Check-in conflicts with an existing booking";
        }
        if (endDate <= booking.endDate && endDate >= booking.startDate) {
            conflictErrors.endDate = "Checkout conflicts with an existing booking";
        }
        if (startDate < booking.startDate && endDate > booking.endDate) {
            conflictErrors.overlap = "Dates overlap an existing booking";
        }
    });

    return conflictErrors;
}

// Get all spots:
router.get('/', async (req, res, next) => {

    let { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    maxLat = parseFloat(maxLat);
    minLat = parseFloat(minLat);
    maxLng = parseFloat(maxLng);
    minLng = parseFloat(minLng);
    maxPrice = parseFloat(maxPrice);
    minPrice = parseFloat(minPrice);

    let errors = {};
    if (page < 1) errors.page = "Page must be greater than or equal to 1";
    if (size < 1) errors.size = "Size must be greater than or equal to 1";
    if (maxLat < -90 || maxLat > 90) errors.maxLat = "Maximum latitude is invalid";
    if (minLat < -90 || minLat > 90) errors.minLat = "Minimum latitude is invalid";
    if (maxLng < -180 || maxLng > 180) errors.maxLng = "Maximum longitude is invalid";
    if (minLng < -180 || minLng > 180) errors.minLng = "Minimum longitude is invalid";
    if (maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0";
    if (minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0";

    if (Object.keys(errors).length) {
        const err = new Error("Validation");
        err.status = 400;
        err.title = "Validation Error";
        err.message = "Validation Error";
        err.errors = errors;
        next(err);
    } else {

        let query = {
            where: {},
            include: [
                { model: Review },
                { model: SpotImage }
            ]
        };

        if (!page || page > 10) page = 1;
        // if (!size || size > 20) size = 20;
        if (!size) size = null;

        query.limit = size;
        query.offset = size * (page - 1);

        if (maxLat) query.where.lat = { [Op.lt]: maxLat };
        if (minLat) query.where.lat = { [Op.gt]: minLat };
        if (maxLng) query.where.lng = { [Op.lt]: maxLng };
        if (minLng) query.where.lng = { [Op.gt]: minLng };
        if (maxPrice) query.where.price = { [Op.lt]: maxPrice };
        if (minPrice) query.where.price = { [Op.gt]: minPrice };

        const spots = await Spot.findAll(query);

        res.json({
            Spots: aggregateSpotData(spots),
            page,
            size
        });
    }
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
router.get('/:spotId', async (req, res) => {

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

// Get spot reviews by spot id:
router.get('/:spotId/reviews', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found"
        next(err);
    } else {
        const reviews = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        });

        res.json({ Reviews: reviews });
    }
});

// Get all bookings of a spot:
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    let spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Booking,
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        }
    });

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found"
        next(err);
    } else if (req.user.id === spot.ownerId) {
        spot = spot.toJSON();
        res.json({ Bookings: spot.Bookings });
    } else {
        spot = spot.toJSON();
        spot.Bookings.forEach(booking => {
            delete booking.User;
            delete booking.id;
            delete booking.userId;
            delete booking.createdAt;
            delete booking.updatedAt;
        });
        res.json({ Bookings: spot.Bookings });
    }
});

// Create a new spot:
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const owner = await User.findByPk(req.user.id);

    const spot = await owner.createSpot({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201);
    res.json(spot);
});

// Add an image to a spot by spot id:
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found"
        next(err);
    } else if (req.user.id != spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else {
        const image = await spot.createSpotImage({
            url: req.body.url,
            preview: req.body.preview
        });

        const { id, url, preview } = image;
        const response = {
            id,
            url,
            preview
        }

        res.json(response);
    }
});

// Create a booking:
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const today = new Date();

    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Booking
        }
    });
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found";
        next(err);
    } else if (req.user.id === spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Action";
        err.message = "User is the owner of this spot"
        err.errors = {
            ownerConflict: "Cannot make a reservation for a spot you are hosting"
        };
        next(err);
    } else if (startDate < today) {
        const err = new Error("Validation");
        err.status = 400;
        err.title = "Validation Error";
        err.message = "Validation Error";
        err.errors = {
            timeTravel: "Reservation cannot be in the past or too close to check-in"
        };
        next(err);
    } else if (startDate >= endDate) {
        const err = new Error("Validation");
        err.status = 400;
        err.title = "Validation Error";
        err.message = "Validation Error";
        err.errors = {
            endDate: "Checkout cannot be on or before check-in"
        };
        next(err);
    } else {
        let bookingConflict = dateConflict(startDate, endDate, spot.Bookings);
        if (Object.keys(bookingConflict).length) {
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
            const booking = await spot.createBooking({
                userId: req.user.id,
                startDate,
                endDate
            });
            res.json(booking);
        }
    }
});

// Add a review to a spot by spot id:
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review
        }
    });

    let userHasReview = (userId, spot) => {
        spot = spot.toJSON();
        for (let review of spot.Reviews) {
            if (review.userId === userId) {
                return true;
            }
        }
        return false;
    };

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found"
        next(err);
    } else if (userHasReview(req.user.id, spot)) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden Error";
        err.message = "User already has a review for this spot"
        next(err);
    } else {
        const review = await spot.createReview({
            userId: req.user.id,
            review: req.body.review,
            stars: req.body.stars
        });

        res.status(201);
        res.json(review);
    }
});

// Edit a spot:
router.put('/:spotId', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found"
        next(err);
    } else if (req.user.id != spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.json(spot);
    }
});

// Delete a spot:
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot couldn't be found"
        next(err);
    } else if (req.user.id != spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else {
        await spot.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }
});

module.exports = router;
