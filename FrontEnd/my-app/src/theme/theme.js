// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#e34004', // A distinct blue
        },
        secondary: {
            main: '#e34004', // A vibrant orange
        },
        background: {
            default: '#dce1e0', // A light grey background
        },
        text: {
            primary: '#394854', // Deep grey for text
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        button: {
            textTransform: 'none', // Buttons use the font without uppercase transformation
        },
    },
});

export default theme;
