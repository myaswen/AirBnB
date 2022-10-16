import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const formatName = (name) => {
        let firstLetter = name.slice(0, 1);
        let otherLetters = name.slice(1);
        firstLetter = firstLetter.toUpperCase();
        otherLetters = otherLetters.toLowerCase();
        return firstLetter + otherLetters;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                firstName: formatName(firstName),
                lastName: formatName(lastName),
                email,
                username,
                password
            }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='form_wrapper'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='error_list'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                <div className='input_wrapper'>
                    <input
                        placeholder='First Name'
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Last Name'
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Email'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Confirm Password'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit_form_button" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;
