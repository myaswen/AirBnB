import React from "react";
import './CreateSpotForm.css';

const CreateSpotForm = () => {
    return (
        <div className="create_spot_wrapper">
            <div className='create_spot_form_wrapper'>
            <h2>Create a spot</h2>
            <form>
                <div className='error_list'>
                    {/* {errors.map((error, idx) => <div key={idx}>{error}</div>)} */}
                </div>
                <div className='input_wrapper'>
                    <input
                        placeholder='Address'
                        type="text"
                        required
                    />
                    <input
                        placeholder='City'
                        type="text"
                        required
                    />
                    <input
                        placeholder='State'
                        type="text"
                        required
                    />
                    <input
                        placeholder='Country'
                        type="text"
                        required
                    />
                    <input
                        placeholder='Latitude'
                        type="number"
                        required
                    />
                    <input
                        placeholder='Longitude'
                        type="number"
                        required
                    />
                    <input
                        placeholder='Name'
                        type="text"
                        required
                    />
                    <input
                        placeholder='Price'
                        type="number"
                        required
                    />
                    <textarea
                    placeholder="Enter a description"
                    // cols="30"
                    rows="16"
                    required
                    />
                </div>
                <button className="submit_form_button" type="submit">Create</button>
            </form>
        </div>
        </div>
    );
}

export default CreateSpotForm;
