import { SvgIconProps } from '@mui/material';

interface Icons {
  [key: string]: SvgIconProps;
}

const icons: Icons = {
  plus_outlined: (
    <>
      <path
        id="Ellipse 8"
        d="M13 7.00366C13 10.3174 10.3137 13.0037 7 13.0037C3.68629 13.0037 1 10.3174 1 7.00366C1 3.68995 3.68629 1.00366 7 1.00366C10.3137 1.00366 13 3.68995 13 7.00366Z"
        stroke="#7786D2"
      />
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 4.15942C7.5 3.88328 7.27614 3.65942 7 3.65942C6.72386 3.65942 6.5 3.88328 6.5 4.15942L6.5 6.65942H4C3.72386 6.65942 3.5 6.88328 3.5 7.15942C3.5 7.43557 3.72386 7.65942 4 7.65942H6.5L6.5 10.1594C6.5 10.4356 6.72386 10.6594 7 10.6594C7.27614 10.6594 7.5 10.4356 7.5 10.1594L7.5 7.65942H10C10.2761 7.65942 10.5 7.43557 10.5 7.15942C10.5 6.88328 10.2761 6.65942 10 6.65942H7.5L7.5 4.15942Z"
        fill="#7786D2"
      />
    </>
  ),
  minus_squared: (
    <>
      <rect
        id="Rectangle 3"
        y="0.317871"
        width="21.3645"
        height="21.3645"
        rx="4"
        fill="#C7D1F4"
      />
      <g id="Group 28">
        <path
          id="Vector 8"
          d="M7.73047 11.001L13.6331 11.001"
          stroke="white"
          strokeLinecap="round"
        />
      </g>
    </>
  ),
  plus_squared: (
    <>
      <rect
        id="Rectangle 3"
        x="0.364258"
        y="0.317871"
        width="21.3645"
        height="21.3645"
        rx="4"
        fill="#C7D1F4"
      />
      <g id="Group 28">
        <path
          id="Vector 8"
          d="M8.09473 11.001L13.9974 11.001"
          stroke="white"
          strokeLinecap="round"
        />
        <path
          id="Vector 9"
          d="M11.0469 13.9521L11.0469 8.04947"
          stroke="white"
          strokeLinecap="round"
        />
      </g>
    </>
  ),
};

export default Object.freeze(icons);
