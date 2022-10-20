import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TH_deleteBooking } from "../../store/bookingReducer";
import './UserBookingsCard.css';

const UserBookingsCard = ({ booking }) => {
    const dispatch = useDispatch();
    const [deleteConfirm, setDeleteConfirm] = useState();
    const [deleteMessage, setDeleteMessage] = useState('Are you sure? Click again to proceed:');
    const [deleteError, setDeleteError] = useState(false);

    const handleDelete = async () => {
        if (deleteConfirm) {
            await dispatch(TH_deleteBooking(booking.id))
        } else {
            const today = new Date();
            const startDateObject = new Date(booking.startDate);
            if (today > startDateObject) {
                setDeleteMessage('Cannot cancel past or active reservations.');
                setDeleteError(true);
            } else {
                setDeleteConfirm(true);
            }
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
                            {deleteMessage}
                        </div>
                    )}
                    {deleteError && (
                        <div className="delete_booking_warning">
                            {deleteMessage}
                        </div>
                    )}
                    {!deleteError && <button onClick={handleDelete} className="delete_booking_button">Cancel</button>}
                </div>
            </div>
            <div className="booking_spot_preview">
                <img src={booking.Spot.previewImage} alt="TEST IMAGE" />
            </div>
        </div>
    );
}

export default UserBookingsCard;
