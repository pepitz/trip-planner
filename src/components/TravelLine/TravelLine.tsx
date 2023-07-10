import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';

import { ICityAutocompleteProps } from 'types';
import * as CONSTANTS from 'constants/index';
import icons from 'enums/icons';
import './TravelLine.scss';
import CustomIcon from 'components/CustomIcon/CustomIcon';

interface ITimeLineProps {
  stops: ICityAutocompleteProps[];
}
const TimeLine = ({ stops }: ITimeLineProps): JSX.Element => {
  return (
    <Timeline position="left" sx={{ margin: '0 8px 0 0', padding: 0 }}>
      {stops.length > 0
        ? stops.map((stop) => {
            return (
              <TimelineItem
                key={stop.name}
                sx={{
                  '&::before': {
                    padding: 0,
                    width: 0,
                  },
                }}
              >
                <TimelineSeparator>
                  {stop.name !== CONSTANTS.DESTINATION ? (
                    <CustomIcon
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      icon={icons.ellipse}
                    />
                  ) : (
                    <CustomIcon
                      width="12"
                      height="17"
                      viewBox="0 0 12 17"
                      icon={icons.union}
                    />
                  )}
                  {stop.name === CONSTANTS.DESTINATION ? null : (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
              </TimelineItem>
            );
          })
        : null}
    </Timeline>
  );
};
export default TimeLine;
