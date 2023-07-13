import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';

import { Distance } from 'types';
import { format } from 'date-fns';
import * as CONSTANTS from 'constants/index';

import { fetchDistances } from 'api/cities';
import useCustomSearchParams from 'hooks/useCustomSearchParams';

import 'components/SearchForm/SearchForm.scss';
import './Results.scss';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import icons from 'enums/icons';

const Results = () => {
  const navigate = useNavigate();
  const [searchAsObject, searchParams] = useCustomSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Distance[]>([]);
  const [error, setError] = useState(null);

  const passengersCount = searchParams.get('passengersCount');
  const date = searchParams.get('selectedDate');

  let dateArr: string[] = [];
  if (date) {
    dateArr = date.split('/');
  }
  const formatted = format(
    new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0]),
    'MMM, dd yyyy'
  );

  let cities = Object.entries(searchAsObject)
    .filter(
      (entry) =>
        entry[0] !== CONSTANTS.DATE_KEY && entry[0] !== CONSTANTS.PASSENGERS_KEY
    )
    .map((entry: [string, string], idx) => {
      return { index: idx, key: entry[0], value: entry[1] };
    });

  useEffect(() => {
    if (cities.length > 0 && data.length === 0) {
      setError(null);
      setLoading(true);
      const points = cities.map((name) => name.value);
      fetchDistances(points)
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  }, [cities, data.length]);

  const totalDistance = useMemo(() => {
    const total = data.reduce(
      (previous, current) => previous + current.distance,
      0
    );
    return Math.round(total * 100) / 100;
  }, [data]);
  const stringifiedParams = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  const goBack = useCallback(() => {
    navigate(`/?${stringifiedParams}`);
  }, [navigate, stringifiedParams]);

  const points = cities.map((city) => city.value);
  data.forEach((stop, index) => {
    if (index % 2 === 0) {
      points.splice(index + 1, 0, `${stop.distance} km`);
    } else {
      points.splice(index + 2, 0, `${stop.distance} km`);
    }
  });

  let content = null;

  if (loading) {
    content = (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress size={30} />
        <Box>Loading...</Box>
      </Box>
    );
  }
  if (!error) {
    content = (
      <Box component="section" className="results__timeline">
        <Box className="results__timeline-wrapper">
          <Timeline position="alternate">
            {points.length &&
              points.map((point, index) => {
                return (
                  <TimelineItem
                    key={point}
                    className={index % 2 !== 0 ? 'timeline-results' : ''}
                  >
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{ display: index % 2 !== 0 ? 'none' : 'block' }}
                      ></TimelineDot>
                      {index === points.length - 1 ? null : (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent
                      className={index % 2 !== 0 ? 'distance' : ''}
                    >
                      {point}
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
          </Timeline>
        </Box>
        <Box className="results__timeline-summary">
          <Box className="total">
            <Box className="highlight">
              <Box component="span" className="highlights">
                {totalDistance}
              </Box>{' '}
              km is total distance
            </Box>
          </Box>
          <Box className="passengers">
            <Box className="highlights">{passengersCount} passenger(s)</Box>
          </Box>
          <Box className="date highlights">
            <Box>{formatted}</Box>
          </Box>
          <Box>
            <Button
              id="button-back"
              variant="outlined"
              onClick={goBack}
              type="button"
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    content = (
      <>
        <Box>Ooops! something went wrong.</Box>
        <Box>
          <Button onClick={goBack}>Back</Button>
        </Box>
      </>
    );
  }

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
      <Box
        className="results"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          width: '55vw',
          padding: '4rem 8rem',
          border: '1px solid transparent',
          borderRadius: '1.6rem',
          boxShadow: (theme) => `1px 4px 10px ${theme.others.gray}`,
          background: (theme) => theme.others.white,
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default Results;
