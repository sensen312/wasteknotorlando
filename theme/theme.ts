// Theme for site comes from the pantone pdf
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const brandColors = {
  primary: '#005B39', // Hex for PANTONE 6160
  secondary: '#78BE20', // PANTONE 368
  black: '#000000',
  backgroundDefault: '#FEFEFE', // Off white
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
};

let theme = createTheme({
  palette: {
    primary: {
    main: brandColors.primary,
    },
    secondary: {
    main: brandColors.secondary,
    },
    background: {
    default: brandColors.backgroundDefault,
    paper: '#FFFFFF',
    },
    text: {
    primary: brandColors.textPrimary,
    secondary: brandColors.textSecondary,
    },
  },
  typography: { // made Kaleko main font with fall backs
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    h1: {
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '5px',
    },
    h2: {
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '5px',
    },
    h3: {
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    fontWeight: 700,
    letterSpacing: '1px',
    },
    h4: {
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    letterSpacing: '1px',
    },
    h5: {
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    fontWeight: 700,
    },
    body1: {
      fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
    button: {
    fontFamily: '"Kaleko 105", "Helvetica", "Arial", sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '1rem',
    }
  },
  components: {
    MuiCssBaseline: {
    styleOverrides: `
      @font-face {
      font-family: 'Kaleko 105';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url(/fonts/Kaleko105Book.woff) format('woff');
      }
      @font-face {
      font-family: 'Kaleko 105';
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: url(/fonts/Kaleko105Bold.woff) format('woff');
      }
    `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
        borderRadius: 8,
        padding: '8px 20px',
        },
        containedPrimary: {
          color: 'white',
        },
        containedSecondary: {
          color: brandColors.primary,
        }
      }
    },
    MuiCard: {
    styleOverrides: {
      root: {
      borderRadius: 16,
      boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
      },
      },
    },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'rgba(254, 254, 254, 0.8)',
          backdropFilter: 'blur(8px)',
        }
      }
    }
  },
});

export default responsiveFontSizes(theme);
