import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './EditSpotForm.css';
import { TH_editSpot, TH_fetchSpots } from "../../store/spotReducer";

const EditSpotForm = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(TH_fetchSpots());
    }, [dispatch]);

    const spotToEdit = useSelector(state => state.spots.allspots[spotId])

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
        if (spotToEdit) {
            setAddress(spotToEdit.address);
            setCity(spotToEdit.city);
            setState(spotToEdit.state);
            setCountry(spotToEdit.country);
            setLat(spotToEdit.lat);
            setLng(spotToEdit.lng);
            setName(spotToEdit.name);
            setPrice(spotToEdit.price);
            setPreviewImage(spotToEdit.previewImage);
            setDescription(spotToEdit.description);
        }
    }, [spotToEdit]);

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

        console.log("NEW DATA", inputData, previewImage);

        let editedSpot = await dispatch(TH_editSpot(spotId, inputData, previewImage))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        if (editedSpot) history.push(`/spots/${editedSpot.id}`)

    }

    const handleDelete = () => {
        if (deleteConfirm) {
            console.log("SO IT SHALL BE DONE.");
            history.push('/');
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
                        <input
                            placeholder="Preview image URL"
                            type="text"
                            required
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                        />
                        <textarea
                            placeholder="Enter a description"
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
