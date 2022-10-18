import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TH_fetchSpot } from '../../store/spotReducer';
import './SpotBodyContent.css';

const SpotBodyContent = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const spotObject = useSelector(state => state.spots.singleSpot);

    const spotImages = spotObject.SpotImages;
    const previewImage = spotImages?.find(image => image.preview === true);
    let nonPreviewImages = spotImages?.filter(image => image.preview !== true)
    nonPreviewImages = nonPreviewImages?.slice(0, 4);

    let imageContent;
    if (nonPreviewImages?.length === 4) {
        imageContent = (
            <div className='preview_grid'>
                <img className="preview_image_large" src={previewImage?.url} alt='main preview' />
                <div className='sub_preview_grid'>
                    {nonPreviewImages?.map(imageObj => (
                        <img className="preview_images" key={imageObj.id} src={imageObj.url} alt='preview image' />
                    ))}
                </div>
            </div>
        )
    } else {
        imageContent = (
            <div className='single_preview_grid'>
                <img className="preview_image_large" src={previewImage?.url} alt='main preview' />
            </div>
        )
    }

    useEffect(() => {
        dispatch(TH_fetchSpot(spotId));
    }, [dispatch]);

    let ownerStatus;
    if (sessionUser?.id === spotObject?.ownerId) ownerStatus = true;


    return (
        <div className='spot_body_wrapper'>
            <div className='spot_header'>
                <div className='name_location_wrapper'>
                    <h2>{spotObject?.name}</h2>
                    <div className='location_header'>{spotObject?.city}, {spotObject?.state}</div>
                </div>
                {ownerStatus && (<Link to={`/spots/${spotId}/edit`}>Edit Spot</Link>)}
            </div>
            {imageContent}
            <div className='subcontent_wrapper'>
                <div className='othercontent_wrapper'>
                    <div className='spot_description'>
                        <h3>Hosted by {spotObject?.Owner?.firstName} {spotObject?.Owner?.lastName}</h3>
                        {spotObject?.description}
                    </div>
                </div>
                <div className='booking_wrapper'>
                    <div className='booking_card_STANDIN' />
                </div>

            </div>
        </div>
    );
}

export default SpotBodyContent;
