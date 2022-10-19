import React from "react";
import './CreateBookingCard.css';

const CreateBookingCard = ({ sessionUser, currentSpot }) => {
    console.log("CURRENT SPOT", currentSpot);
    return (
        <form className="create_booking_wrapper">
            <div className="booking_price_reviews">
                <div className="price">
                    <span className="bold">${currentSpot.price}</span> night
                </div>
                <div>
                    <i className="fa-solid fa-star"></i>
                    {currentSpot.avgStarRating} · <span className="small_reviews">{currentSpot.numReviews} reviews</span>
                </div>
            </div>
            <div className="dates_container">
                <div className="date_input_containers">
                    <label>
                        CHECK-IN
                        <input type="date" />
                    </label>
                </div>
                <div className="date_input_containers">
                    <label>
                        CHECKOUT
                        <input type="date" />
                    </label>
                </div>
            </div>
            <div className="reserve_button_container">
                <button className="reserve_booking_button" type="submit">Reserve</button>
            </div>
            <div className="total_price">
                <div>Total before taxes</div>
                <div>$XXX</div>
            </div>
        </form>
    );
}

export default CreateBookingCard;
