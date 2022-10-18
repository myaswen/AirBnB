import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { TH_postSpot } from "../../store/spotReducer";
import './CreateSpotForm.css';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const inputData = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            description
        }

        dispatch(TH_postSpot(inputData))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        // TO DO: redirect user or reset form inputs if success
    }

    return (
        <div className="create_spot_wrapper">
            <div className='create_spot_form_wrapper'>
                <h2>Create a spot</h2>
                <form onSubmit={handleSubmit}>
                    <div className='error_list'>
                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                    </div>
                    <div className='input_wrapper'>
                        <input
                            placeholder='Address'
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            placeholder='City'
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            placeholder='State'
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            placeholder='Country'
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <input
                            placeholder='Latitude'
                            type="number"
                            required
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                        <input
                            placeholder='Longitude'
                            type="number"
                            required
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                        <input
                            placeholder='Give your spot a name'
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            placeholder='Price per night'
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder="Enter a description"
                            // cols="30"
                            rows="16"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="submit_form_button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateSpotForm;
