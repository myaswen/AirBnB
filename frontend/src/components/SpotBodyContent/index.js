import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TH_fetchSpots } from '../../store/spotReducer';
import './SpotBodyContent.css';

const SpotBodyContent = () => {
    const { spotId } = useParams();

    const dispatch = useDispatch();
    const spotObject = useSelector(state => state.spots.allspots[spotId]);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(TH_fetchSpots());
    }, [dispatch]);

    let ownerStatus
    if (sessionUser?.id === spotObject?.ownerId) ownerStatus = true;

    return (
        <div className='spot_body_wrapper'>
            <div className='spot_header'>
                <div className='name_location_wrapper'>
                    <h2>{spotObject?.name}</h2>
                    <div className='location_header'>{spotObject?.city}, {spotObject?.state}</div>
                </div>
                {ownerStatus && (<Link to="">Edit Spot</Link>)}
            </div>
            <div className='preview_grid'>
                <img className="preview_image_large" src={spotObject?.previewImage} alt='main preview' />
                <div className='sub_preview_grid'>

                </div>
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
