import { csrfFetch } from "./csrf";

const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings';

export const AC_loadUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        payload: bookings
    }
}

export const TH_fetchUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');
    const bookings = await response.json();
    dispatch(AC_loadUserBookings(bookings));
}

const initialState = { userBookings: {} };

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_BOOKINGS:
            newState = { ...state, userBookings: normalizeData([...action.payload.Bookings]) }
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

export default bookingsReducer;
