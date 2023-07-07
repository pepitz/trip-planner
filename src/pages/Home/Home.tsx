import Box from '@mui/material/Box';
import SearchForm from 'components/SearchForm/SearchForm';

import '../../styles/Background.scss';

const Home = () => {
  return (
    <Box
      component="main"
      className="backgroundContainer"
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SearchForm />
    </Box>
  );
};

export default Home;
