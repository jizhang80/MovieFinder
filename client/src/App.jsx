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

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



// function App() {
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
