import Box from '@mui/material/Box';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};
const Background = ({ children }: Props) => {
  return <Box className="backgroundContainer">{children}</Box>;
};

export default Background;
