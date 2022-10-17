import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TH_fetchSpots } from '../../store/spotReducer';
import './SpotBodyContent.css';

const SpotBodyContent = () => {
    const { spotId } = useParams();

    const dispatch = useDispatch();
    const spotObject = useSelector(state => state.spots.allspots[spotId]);

    useEffect(() => {
        dispatch(TH_fetchSpots());
    }, [dispatch]);

    return (
        <div className='spot_body_wrapper'>
            <h2>{spotObject?.name}</h2>
            <div className='location_header'>{spotObject?.city}, {spotObject?.state}</div>
            <div className='images_grid'>
            </div>
            <div className='subcontent_wrapper'>
                <div className='othercontent_wrapper'>
                    <div className='spot_description'>{spotObject?.description}</div>

                </div>
                <div className='booking_wrapper'>
                    <div className='booking_card_STANDIN' />
                </div>

            </div>
        </div>
    );
}

export default SpotBodyContent;
