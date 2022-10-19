import React from "react";
import './UserBookingsCard.css';

const UserBookingsCard = () => {
    return (
        <div className="user_bookings_card">
            <div className="user_booking_info">
                <div className="spot_host_name">
                    <div className="bookings_card_spot_name">Spot Name</div>
                    <div>Hosted by Person Name</div>
                </div>
                <div className="bookings_date_address">
                    <div className="res_dates">
                        <div>
                            <div className="res_date_lables">CHECK-IN</div>
                            10-19-2022
                        </div>
                        <div>
                            <div className="res_date_lables">CHECKOUT</div>
                            10-20-2022
                        </div>
                    </div>
                    <div className="res_address">
                        <div>123 Fake St</div>
                        <div>San Francisco, California</div>
                        <div className="res_country">United States</div>
                    </div>
                </div>
            </div>
            <div className="booking_spot_preview">
                <img src="https://a0.muscache.com/im/pictures/3213f86d-1c2b-4214-90fe-20d51dc8f182.jpg?im_w=1200" alt="TEST IMAGE" />
            </div>
        </div>
    );
}

export default UserBookingsCard;
