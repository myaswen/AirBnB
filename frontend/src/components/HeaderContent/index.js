import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import "./HeaderContent.css";

const HeaderContent = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    const checkSession = (e) => {
        if (!sessionUser) {
            e.preventDefault();
            alert("Please log in to become a host.");
        }
    }

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    let profileOptions;
    if (sessionUser) {
        profileOptions = (
            <div className="profile-dropdown">
                <div>{sessionUser.username}</div>
                <div>{sessionUser.email}</div>
                <div onClick={logout} className="logout_button">Logout</div>
            </div>
        );
    } else {
        profileOptions = (
            <div className="profile-dropdown">
                <div><LoginFormModal /></div>
                <div><SignupFormModal /></div>
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
                <Link onClick={checkSession} to="/spots/create">Become a host</Link>
                <div onClick={toggleMenu} className="profile_menu_button">
                    <i className="fa-solid fa-bars menu_icon"></i>
                    <i className="fa-solid fa-circle-user profile_icon"></i>
                </div>
                {showMenu && isLoaded && profileOptions}
            </div>
        </div>
    );
}

export default HeaderContent;
