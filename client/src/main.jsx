import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App.jsx';
import Home from './components/Home.jsx'; // Import the Home component
import WatchList from './components/WatchList.jsx';
import ButtonAppBar from './components/NavTabs.jsx';


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
      </ThemeProvider>
    ),
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        path: '/saved',
        element: (
          <ThemeProvider theme={theme}>
            <WatchList />
          </ThemeProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
);