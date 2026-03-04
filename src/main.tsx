import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { muiTheme } from './theme/muiTheme';
import { BiodataProvider } from './context/BiodataContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <BiodataProvider>
        <ThemeProvider theme={muiTheme}>
          {/* CssBaseline resets browser default styles + applies MUI background color */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BiodataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import App from './App';
// import { muiTheme } from './theme/muiTheme';
// import { BiodataProvider } from './context/BiodataContext';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <BiodataProvider>
//         <ThemeProvider theme={muiTheme}>
//           <CssBaseline />
//           <App />
//         </ThemeProvider>
//       </BiodataProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
