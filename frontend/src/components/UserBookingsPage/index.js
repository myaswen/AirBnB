import React from "react";
import UserBookingsCard from "../UserBookingsCard";
import './UserBookingsPage.css';

const UserBookingsPage = () => {
    return (
        <div className="user_bookings_wrapper">
            <h2>Trips</h2>
            <h3>Upcoming Reservations</h3>
            <UserBookingsCard />
        </div>
    );
}

export default UserBookingsPage;
