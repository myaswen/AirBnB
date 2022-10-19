import { csrfFetch } from "./csrf";

const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings';
// const CREATE_BOOKING = 'bookings/createBooking';

export const AC_loadUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        payload: bookings
    }
}

// export const AC_createBooking = (booking) => {
//     return {
//         type: CREATE_BOOKING,
//         payload: booking
//     }
// }

export const TH_fetchUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');
    const bookings = await response.json();
    dispatch(AC_loadUserBookings(bookings));
}

export const TH_createBooking = (spotId, userInput) => async (dispatch) => {
    const responseOne = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput)
    });

    if (responseOne.ok) {
        const responseTwo = await csrfFetch('/api/bookings/current');
        const bookings = await responseTwo.json();
        dispatch(AC_loadUserBookings(bookings));
        return true;
    }
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
