import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#8B0000',        // deep maroon
      light: '#B22222',
      dark: '#5C0000',
    },
    secondary: {
      main: '#D4AF37',        // gold
      light: '#F0D060',
      dark: '#A07D10',
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: '#FFF8F0',     // warm cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#6B4C3B',
    },
  },
  typography: {
    fontFamily: '"Noto Sans Devanagari", "Noto Sans", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 4vw, 2.125rem)',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          '&.Mui-active': {
            color: '#8B0000',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
