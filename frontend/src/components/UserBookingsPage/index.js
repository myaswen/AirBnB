import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { TH_fetchUserBookings } from "../../store/bookingReducer";
import UserBookingsCard from "../UserBookingsCard";
import './UserBookingsPage.css';

const UserBookingsPage = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const bookingsObject = useSelector(state => state.bookings.userBookings);
    const bookingsIds = Object.keys(bookingsObject);

    useEffect(() => {
        dispatch(TH_fetchUserBookings());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className="user_bookings_wrapper">
            <h2>Trips</h2>
            <h3>Your Reservations</h3>
            <div className="user_booking_cards_wrapper">
            {
                bookingsIds.map(id => (
                    <UserBookingsCard
                        booking={bookingsObject[id]}
                        key={id}
                    />
                ))
            }
            </div>
        </div>
    );
}

export default UserBookingsPage;
