import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './pages/Home.jsx';
import WatchList from './pages/WatchList.jsx';
import ModalsContainer from './components/ModalsContainer.jsx'; 
import ButtonAppBar from './components/NavTabs.jsx';
import Footer from './components/Footer.jsx'; // Import the Footer component

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
        <Home />
        <Footer /> {/* Wrap Footer component in ThemeProvider */}
      </ThemeProvider>
    ),
    errorElement: <h1 className="display-2">Wrong page!</h1>,
  },
  {
    path: '/saved',
    element: (
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
        <WatchList />
        <Footer /> {/* Wrap Footer component in ThemeProvider */}
      </ThemeProvider>
    ),
  },
]);

const rootElement = document.getElementById('root');
const modalRootElement = document.getElementById('modal-root');

ReactDOM.createRoot(rootElement).render(
  <>
    <RouterProvider router={router} />
    {/* Render modals container */}
    <ModalsContainer rootElement={modalRootElement} />
  </>
);
