import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import './EditSpotForm.css';
import { TH_deleteSpot, TH_editSpot, TH_fetchSpot } from "../../store/spotReducer";

const EditSpotForm = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const spotToEdit = useSelector(state => state.spots.singleSpot);
    const spotImages = spotToEdit.SpotImages;
    const previousPreviewImage = spotImages?.find(image => image.preview === true);

    useEffect(() => {
        dispatch(TH_fetchSpot(spotId));
    }, [dispatch]);

    const [deleteConfirm, setDeleteConfirm] = useState(false);
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

    useEffect(() => {
        if (Object.keys(spotToEdit).length > 0) {
            setAddress(spotToEdit.address);
            setCity(spotToEdit.city);
            setState(spotToEdit.state);
            setCountry(spotToEdit.country);
            setLat(spotToEdit.lat);
            setLng(spotToEdit.lng);
            setName(spotToEdit.name);
            setPrice(spotToEdit.price);
            setPreviewImage(previousPreviewImage.url)
            setDescription(spotToEdit.description);
        }
    }, [spotToEdit]);

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/" />;
    if (sessionUser && Object.keys(spotToEdit).length > 0 && sessionUser.id !== spotToEdit.ownerId) {
        console.log("SESSION & SPOT", sessionUser, spotToEdit);
        return <Redirect to="/" />;
    }


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
            let editedSpot = await dispatch(TH_editSpot(spotId, inputData, previousPreviewImage.id, previewImage))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });

            if (editedSpot) history.push(`/spots/${editedSpot.id}`)
        } else {
            setErrors(["Preview URL must be between 2 and 254 characters."]);
        }
    }

    const handleDelete = async () => {
        if (deleteConfirm) {
            let deletionRes = await dispatch(TH_deleteSpot(spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });

            if (deletionRes) history.push('/');
        } else {
            setDeleteConfirm(true);
        }
    }

    return (
        <div className="create_spot_wrapper">
            <div className='create_spot_form_wrapper'>
                <h2>Edit - {spotToEdit?.name}</h2>
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
                    <button className="submit_form_button" type="submit">Submit Changes</button>
                </form>
                {deleteConfirm && (
                    <div className="delete_spot_warning">
                        Are you sure you want to delete {spotToEdit?.name}? This action is permanent. Click again to proceed.
                    </div>
                )}
                <button onClick={handleDelete} className="delete_spot_button">Delete Spot</button>
            </div>
        </div>
    );
}

export default EditSpotForm;
