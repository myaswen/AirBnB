const express = require('express');

const { SpotImage, User, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Delete a spot image:
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const user = await User.findByPk(req.user.id);
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot
        }
    });

    if (!spotImage) {
        const err = new Error("Not Found");
        err.status = 404;
        err.title = "Resource not found";
        err.message = "Spot Image couldn't be found"
        next(err);
    } else if (user.id != spotImage.Spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Authorization Error";
        err.message = "User is not authorized for this action"
        next(err);
    } else {
        await spotImage.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        });
    }
});

module.exports = router;
