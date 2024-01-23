import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm'; 
import SignupForm from './SignupForm'; 

const ModalsContainer = ({ rootElement }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => setSignupModalOpen(false);

  // Render modals using React Portals
  return (
    <>
      {loginModalOpen &&
        ReactDOM.createPortal(<LoginForm onClose={closeLoginModal} />, rootElement)}
      {signupModalOpen &&
        ReactDOM.createPortal(<SignupForm onClose={closeSignupModal} />, rootElement)}
    </>
  );
};

export default ModalsContainer;
