import React from "react";
import { Link } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = ({ spot }) => {

    return (
        <Link to={`/spots/${spot.id}`} className="card_wrapper">
            <img className="preview_image" src={spot.previewImage} alt='preview' />
            <div className="location_rating">
                <div>{`${spot.city}, ${spot.state}`}</div>
                <div>
                    <i className="fa-solid fa-star"></i>
                    {spot.avgRating}
                </div>
            </div>
            <div className="price">
                <span className="bold">${spot.price}</span> night
            </div>
        </Link>
    );
}

export default SpotCard;
