import SvgIcon from '@mui/material/SvgIcon';

const CustomIcon = ({
  icon,
  width,
  height,
  viewBox,
  fill,
  ...otherProps
}: any): JSX.Element => {
  return (
    <SvgIcon {...otherProps}>
      <svg
        width={width || 14}
        height={height || 14}
        viewBox={viewBox || '0 0 14 14'}
      >
        <g fill={fill ?? 'transparent'}>{icon}</g>
      </svg>
    </SvgIcon>
  );
};

export default CustomIcon;
