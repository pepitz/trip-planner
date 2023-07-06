import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    others: {
      // New colours
      black: string;
      gray: string;
      marks: string;
      purpleDark: string;
      purpleLight: string;
      red: string;
      white: string;
      bgPurple: string;
      bgGreen: string;
    };
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    others: {
      black: '#374151',
      gray: '#E5E7EB',
      marks: '#FAC300',
      purpleDark: '#7786D2',
      purpleLight: '#C7D1F4',
      red: '#FF0000',
      white: '#FFFFFF',
      bgPurple: '#9747FF',
      bgGreen: '#DBF9B3',
    },
  },
});

export default theme;
