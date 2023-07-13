import { Box, IconButton } from '@mui/material';

import CustomIcon from 'components/CustomIcon/CustomIcon';
import icons from 'enums/icons';

import './AddDestinationButton.scss';

interface IAddDestinationButton {
  handleAddCity: () => void;
}

const AddDestinationButton = ({
  handleAddCity,
}: IAddDestinationButton): JSX.Element => {
  return (
    <Box component="section" className="path__container--add-city">
      <label htmlFor="addButton">
        <IconButton id="addButton" onClick={handleAddCity}>
          <CustomIcon fill="transparent" icon={icons.plus_outlined} />
        </IconButton>
        Add destination
      </label>
    </Box>
  );
};

export default AddDestinationButton;
