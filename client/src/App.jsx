import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const App = () => {
  return (
    <>
      <Nav />
     
      <main className="mx-3">
        
        <Outlet />
        
      </main>
      <Footer />
      <LoginForm />
      <SignupForm />
    </>
  );
}

export default App;
