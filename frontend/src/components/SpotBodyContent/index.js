import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SpotBodyContent.css';

const SpotBodyContent = () => {
    const { spotId } = useParams();

    const dispatch = useDispatch();
    const spotObject = useSelector(state => state.spots.allspots[spotId]);
    console.log(spotObject);

    return (
        <div className='spot_body_wrapper'>
            <h2>{spotObject.name}</h2>
            <div className='location_header'>{spotObject.city}, {spotObject.state}</div>
            <div className='images_grid'>

            </div>
        </div>
    );
}

export default SpotBodyContent;
