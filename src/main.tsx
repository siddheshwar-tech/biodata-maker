import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { muiTheme } from './theme/muiTheme';
import { BiodataProvider } from './context/BiodataContext';
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <BiodataProvider>
          <ThemeProvider theme={muiTheme}>
            {/* CssBaseline resets browser default styles + applies MUI background color */}
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </BiodataProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
