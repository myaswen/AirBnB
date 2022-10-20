import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { TH_postSpot } from "../../store/spotReducer";
import './CreateSpotForm.css';

const CreateSpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
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

        if (previewImage.length >= 2 && previewImage.length <= 254) {
            let createdSpot = await dispatch(TH_postSpot(inputData, previewImage))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });

            if (createdSpot) history.push(`/spots/${createdSpot.id}`)
        } else {
            setErrors(["Preview URL must be between 2 and 254 characters."]);
        }
    }

    return (
        <div className="create_spot_wrapper">
            <div className='create_spot_form_wrapper'>
                <h2>Create a spot</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input_wrapper'>
                    <label>Address</label>
                        <input
                            // placeholder='Address'
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label>City</label>
                        <input
                            // placeholder='City'
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <label>State</label>
                        <input
                            // placeholder='State'
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <label>Country</label>
                        <input
                            // placeholder='Country'
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <label>Latitude</label>
                        <input
                            // placeholder='Latitude'
                            type="number"
                            required
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                        <label>Longitude</label>
                        <input
                            // placeholder='Longitude'
                            type="number"
                            required
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                        <label>Give your spot a name</label>
                        <input
                            // placeholder='Give your spot a name'
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Price per night</label>
                        <input
                            // placeholder='Price per night'
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label>Preview image URL</label>
                        <input
                            // placeholder="Preview image URL"
                            type="text"
                            required
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                        />
                        <label>Describe your spot</label>
                        <textarea
                            // placeholder="Enter a description"
                            rows="16"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='error_list'>
                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                    </div>
                    <button className="submit_form_button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateSpotForm;
