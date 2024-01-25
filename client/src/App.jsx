import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
     
      <main className="mx-3">
        
        <Outlet />
        
      </main>
      <Footer />
      <LoginForm />
      <SignupForm />
    </ApolloProvider>
  );
}

export default App;
