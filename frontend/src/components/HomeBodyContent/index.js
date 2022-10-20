import React, { useEffect } from "react";
import './HomeBodyContent.css';
import SpotCard from "../SpotCard";

import { useSelector, useDispatch } from "react-redux";
import { TH_fetchSpots } from "../../store/spotReducer";
import { useLocation } from "react-router-dom";

const HomeBodyContent = () => {
    const dispatch = useDispatch();

    const spotsObject = useSelector(state => state.spots.allspots);
    const spotIds = Object.keys(spotsObject);

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
