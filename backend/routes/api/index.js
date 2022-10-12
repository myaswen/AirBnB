const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const spotImagesRouter = require('./spot-images');
const reviewImagesRouter = require('./review-images');
const bookingsRouter = require('./bookings.js');
const { restoreUser } = require('../../utils/auth.js');

/*
    If current user session is valid, sets req.user to the user in the database.
    If current user session is not valid, sets req.user to null.
*/
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/bookings', bookingsRouter);

// API test route:
router.get('/test', (req, res) => {
    res.json({ message: "Hello." });
});

module.exports = router;
