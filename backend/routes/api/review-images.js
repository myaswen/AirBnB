const express = require('express');

const { ReviewImage, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Delete a review image:
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const user = await User.findByPk(req.user.id);
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    });

    if (!reviewImage) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Review Image couldn't be found"
        next(err);
    } else if (user.id != reviewImage.Review.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else {
        await reviewImage.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        });
    }
});

module.exports = router;
