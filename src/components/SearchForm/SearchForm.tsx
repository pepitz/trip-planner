import Box from '@mui/material/Box';

const SearchForm = () => {
  return (
    <Box
      sx={{
        height: '40vh',
        width: '55vw',
        padding: '3rem 8rem',
        border: '1px solid transparent',
        borderRadius: '1.6rem',
        boxShadow: (theme) => `1px 4px 10px ${theme.others.gray}`,
        background: (theme) => theme.others.white,
      }}
    >
      SearchForm
    </Box>
  );
};

export default SearchForm;
