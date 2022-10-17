const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT = 'spots/loadSpot';

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

const initialState = { allspots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, allspots: normalizeData([...action.payload.Spots]) };
            return newState;
        case LOAD_SPOT:
            newState = {...state, singleSpot: {...action.payload}};
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
