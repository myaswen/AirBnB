import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ showSignUpModal, setShowSignUpModal }) {
    // const [showSignUpModal, setShowSignUpModal] = useState(false);

    return (
        <>
            {/* <div className='signup_button' onClick={() => setShowSignUpModal(true)}>Sign Up</div> */}
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignupForm setShowSignUpModal={setShowSignUpModal} />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
