import React, { useState } from "react";
import './UserBookingsCard.css';

const UserBookingsCard = ({ booking }) => {
    const [deleteConfirm, setDeleteConfirm] = useState();

    const handleDelete = async () => {
        if (deleteConfirm) {
            // // REFACTOR FOR DELETE BOOKING:
            // let deletionRes = await dispatch(TH_deleteSpot(spotId))
            //     .catch(async (res) => {
            //         const data = await res.json();
            //         if (data && data.errors) setErrors(Object.values(data.errors));
            //     });

            // if (deletionRes) history.push('/');
            console.log("SO IT SHALL BE DONE");
        } else {
            setDeleteConfirm(true);
        }
    }

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
                            {booking.startDate.split('T')[0]}
                        </div>
                        <div>
                            <div className="res_date_lables">CHECKOUT</div>
                            {booking.endDate.split('T')[0]}
                        </div>
                    </div>
                    <div className="res_address">
                        <div>{booking.Spot.address}</div>
                        <div>{booking.Spot.city}, {booking.Spot.state}</div>
                        <div className="res_country">{booking.Spot.country}</div>
                    </div>
                </div>
                <div className="delete_booking_container">
                    {deleteConfirm && (
                        <div className="delete_booking_warning">
                            Are you sure? Click again to proceed:
                        </div>
                    )}
                    <button onClick={handleDelete} className="delete_booking_button">Cancel</button>
                </div>
            </div>
            <div className="booking_spot_preview">
                <img src={booking.Spot.previewImage} alt="TEST IMAGE" />
            </div>
        </div>
    );
}

export default UserBookingsCard;
