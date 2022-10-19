import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import './CreateBookingCard.css';

const CreateBookingCard = ({ sessionUser, currentSpot }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const nights = (Math.floor((endDateObj - startDateObj) / (24 * 3600 * 1000)) || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const inputData = {
            startDate,
            endDate
        }

        console.log("NIGHTs: ", nights);
        console.log("BOOKING DATES: ", inputData);
        console.log("SPOT ID: ", currentSpot.id);
        console.log("CURRENT USER: ", sessionUser);


        // // TO DO - REFACTOR FOR BOOKINGS:
        // let createdSpot = await dispatch(TH_postSpot(inputData, previewImage))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(Object.values(data.errors));
        //     });

        // if (createdSpot) history.push(`/spots/${createdSpot.id}`)

    }

    return (
        <form onSubmit={handleSubmit} className="create_booking_wrapper">
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
                        <input
                            type="date"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                </div>
                <div className="date_input_containers">
                    <label>
                        CHECKOUT
                        <input
                            type="date"
                            required
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            {sessionUser && (
                <div className="reserve_button_container">
                    <button className="reserve_booking_button" type="submit">Reserve</button>
                </div>
            )}
            {!sessionUser && (
                <div className="reserve_button_container">
                    <div className="reserve_noSession"><LoginFormModal /></div>
                </div>
            )}
            <div className="total_price">
                <div>Total before taxes</div>
                <div>${nights * currentSpot.price}</div>
            </div>
        </form>
    );
}

export default CreateBookingCard;
