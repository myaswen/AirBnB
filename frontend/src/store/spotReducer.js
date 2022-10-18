import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT = 'spots/loadSpot';
const CREATE_SPOT = 'spots/createSpot';
const EDIT_SPOT = 'spots/editSpot';

export const AC_loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    }
}

export const AC_loadSpot = (spot) => {
    return {
        type: LOAD_SPOT,
        payload: spot
    }
}

export const AC_createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
}

export const AC_editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
}

export const TH_fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    dispatch(AC_loadSpots(spots));
}

export const TH_fetchSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    const spot = await response.json();
    dispatch(AC_loadSpot(spot));
}

export const TH_postSpot = (userInput, previewImage) => async (dispatch) => {

    const responseOne = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput)
    });

    if (responseOne.ok) {
        const unformattedSpot = await responseOne.json();

        const previewImagePayload = { url: previewImage, preview: true };
        await csrfFetch(`/api/spots/${unformattedSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(previewImagePayload)
        });

        const responseTwo = await fetch('/api/spots');
        const spotsObject = await responseTwo.json();

        const formattedSpot = spotsObject.Spots.find(spot => spot.id === unformattedSpot.id);

        dispatch(AC_createSpot(formattedSpot));
        return formattedSpot;
    }
}

export const TH_editSpot = (spotId, userInput, previewImage) => async (dispatch) => {

    const responseOne = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput)
    });

    if (responseOne.ok) {
        const unformattedSpot = await responseOne.json();

        //TO DO: Delete previous preview image

        // const previewImagePayload = { url: previewImage, preview: true };
        // await csrfFetch(`/api/spots/${unformattedSpot.id}/images`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(previewImagePayload)
        // });

        const responseTwo = await fetch('/api/spots');
        const spotsObject = await responseTwo.json();

        const formattedSpot = spotsObject.Spots.find(spot => spot.id === unformattedSpot.id);

        // AC_createSpot will accomplish the same goal as an edit:
        dispatch(AC_createSpot(formattedSpot));
        return formattedSpot;
    }
}


const initialState = { allspots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, allspots: normalizeData([...action.payload.Spots]) };
            return newState;
        case LOAD_SPOT:
            newState = { ...state, singleSpot: { ...action.payload } };
            return newState;
        case CREATE_SPOT:
            newState = { ...state, allspots: { ...state.allspots } };
            newState.allspots[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

function normalizeData(array) {
    let normalized = {};
    array.forEach(element => normalized[element.id] = element);
    return normalized;
}

export default spotsReducer;
