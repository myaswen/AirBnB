import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({setShowLoginModal, showLoginModal}) {
    // const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            {/* <div className='login_button' onClick={() => setShowLoginModal(true)}>Log In</div> */}
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
