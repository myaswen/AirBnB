import React from "react";
import './UserBookingsCard.css';

const UserBookingsCard = ({ booking }) => {
    console.log("FROM BOOKING CARD: ", booking.startDate, booking.endDate)
    return (
        <div className="user_bookings_card">
            <div className="user_booking_info">
                <div className="spot_host_name">
                    <div className="bookings_card_spot_name">{booking.Spot.name}</div>
                    <div>{booking.Spot.city}</div>
                </div>
                <div className="bookings_date_address">
                    <div className="res_dates">
                        <div>
                            <div className="res_date_lables">CHECK-IN</div>
                            {new Date(booking.startDate).toDateString()}
                        </div>
                        <div>
                            <div className="res_date_lables">CHECKOUT</div>
                            {new Date(booking.endDate).toDateString()}
                        </div>
                    </div>
                    <div className="res_address">
                        <div>{booking.Spot.address}</div>
                        <div>{booking.Spot.city}, {booking.Spot.state}</div>
                        <div className="res_country">{booking.Spot.country}</div>
                    </div>
                </div>
            </div>
            <div className="booking_spot_preview">
                <img src={booking.Spot.previewImage} alt="TEST IMAGE" />
            </div>
        </div>
    );
}

export default UserBookingsCard;
