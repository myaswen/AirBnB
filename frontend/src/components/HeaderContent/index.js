import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import "./HeaderContent.css";

const HeaderContent = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const toggleMenu = () => {
        setShowMenu(true);
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleDemoLogin = async () => {
        await dispatch(sessionActions.login({ credential: 'Demo', password: '39gh16g4abjj255' }));
    }

    let profileOptions;
    if (sessionUser) {
        profileOptions = (
            <div className="profile-dropdown">
                <div>{sessionUser.username}</div>
                <div>{sessionUser.email}</div>
                <Link to="/reservations">
                    <div className="in_session_dropdown_buttons">
                        Reservations
                    </div>
                </Link>
                <div onClick={logout} className="in_session_dropdown_buttons">Logout</div>
            </div>
        );
    } else {
        profileOptions = (
            <div className="profile-dropdown">
                <div className='session_dropdown_buttons' onClick={() => setShowLoginModal(true)}>Log In</div>
                <div className='session_dropdown_buttons' onClick={() => setShowSignUpModal(true)}>Sign Up</div>
                <div className='session_dropdown_buttons' onClick={handleDemoLogin}>Demo User</div>
            </div>
        );
    }

    return (
        <div className='header_wrapper'>
            <NavLink exact to="/" className='header_logo'>
                <img src="https://i.imgur.com/2bUqbh2.png" width="40px" alt='logo' />
                tbdbnb
            </NavLink>
            <div className='nav_right'>
                {sessionUser && <Link to="/spots/create">Become a host</Link>}
                {!sessionUser && (
                    <div className='login_to_host'>Login to start hosting!</div>
                )}
                <div onClick={toggleMenu} className="profile_menu_button">
                    <i className="fa-solid fa-bars menu_icon"></i>
                    <i className="fa-solid fa-circle-user profile_icon"></i>
                </div>
                <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
                <SignupFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />
                {showMenu && isLoaded && profileOptions}
            </div>
        </div>
    );
}

export default HeaderContent;
