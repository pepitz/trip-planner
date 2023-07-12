import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    others: {
      // New colours
      black: React.CSSProperties['color'];
      gray: React.CSSProperties['color'];
      marks: React.CSSProperties['color'];
      purpleDark: React.CSSProperties['color'];
      purpleLight: React.CSSProperties['color'];
      red: React.CSSProperties['color'];
      white: React.CSSProperties['color'];
      bgPurple: React.CSSProperties['color'];
      bgGreen: React.CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    others: {
      black: React.CSSProperties['color'];
      gray: React.CSSProperties['color'];
      marks: React.CSSProperties['color'];
      purpleDark: React.CSSProperties['color'];
      purpleLight: React.CSSProperties['color'];
      red: React.CSSProperties['color'];
      white: React.CSSProperties['color'];
      bgPurple: React.CSSProperties['color'];
      bgGreen: React.CSSProperties['color'];
    };
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    error: {
      main: '#FF0000',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // Tell Material UI what the font-size on the html element is.
    htmlFontSize: 10,
  },
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
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          color: '#374151',
          '& .Mui-focused': {
            borderColor: '#C7D1F4',
          },
        },
        option: {
          '& .Mui-focused': {
            backgroundColor: '#C7D1F4',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#374151',
          '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: `1px solid #E5E7EB`,
          },
          '&.MuiOutlinedInput-root.Mui-focused': {
            borderColor: '#C7D1F4',
          },
          '&:hover': {
            borderColor: '#7786D2',
          },
        },
      },
    },
  },
});

export default theme;
