import React from "react";
import { Link } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = () => {
    return (
        <Link to="" className="card_wrapper">
            <img className="preview_image" src="https://a0.muscache.com/im/pictures/3213f86d-1c2b-4214-90fe-20d51dc8f182.jpg?im_w=960" alt='preview' />
            <div className="location_rating">
                <div>Sonoma, California</div>
                <div>
                    <i className="fa-solid fa-star"></i>
                    4.95
                </div>
            </div>
            <div className="price">
                <span className="bold">$350</span> night
            </div>
        </Link>
    );
}

export default SpotCard;
