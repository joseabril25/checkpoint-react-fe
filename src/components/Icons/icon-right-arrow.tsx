export const IconRightArrow = ({...props }) => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill={"none"}
      stroke={props.color || "#000"}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M26 16H4M18 7.5l8.5 8.5-8.5 8.5"
    />
  </svg>
)
