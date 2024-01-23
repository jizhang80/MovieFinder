import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const openLoginForm = () => {
    setShowLoginForm(true);
    setShowSignupForm(false); 
  };

  const openSignupForm = () => {
    setShowSignupForm(true);
    setShowLoginForm(false); 
  };

  const closeForms = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  return (
    <>
      <Nav />
      <main className="mx-3">
        <Outlet />
      </main>
      <Footer />

      {/* Render Login Form Outside of Parent Components */}
      {showLoginForm && <LoginForm onClose={closeForms} />}

      {/* Render Signup Form Outside of Parent Components */}
      {showSignupForm && <SignupForm onClose={closeForms} />}
    </>
  );
}

export default App;

