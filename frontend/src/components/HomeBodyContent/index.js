import React, { useEffect } from "react";
import './HomeBodyContent.css';
import SpotCard from "../SpotCard";

import { useSelector, useDispatch } from "react-redux";
import { TH_fetchSpots } from "../../store/spotReducer";

const HomeBodyContent = () => {
    const dispatch = useDispatch();

    const spotsObject = useSelector(state => state.spots.allspots);
    const spotIds = Object.keys(spotsObject);

    useEffect(() => {
        dispatch(TH_fetchSpots());
    }, [dispatch]);

    return (
        <div className="body_wrapper">
            {
                spotIds.map(id => (
                    <SpotCard
                    spot={spotsObject[id]}
                    key={id}
                    />
                ))
            }
        </div>
    );
}

export default HomeBodyContent;
