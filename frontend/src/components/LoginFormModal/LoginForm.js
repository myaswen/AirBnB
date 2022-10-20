import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginForm({ setShowLoginModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const sessionResponse = await dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (sessionResponse) setShowLoginModal(false);
    }

    return (
        <div className='form_wrapper'>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div className='error_list'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                <div className='input_wrapper'>
                    <input
                        placeholder='Username or Email'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                    <input
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='submit_form_button' type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;
