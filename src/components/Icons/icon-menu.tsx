export const IconMenu = ({...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 800}
    height={props.height || 800}
    fill={props.color || "none"}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 15h18M3 9h18"
    />
  </svg>
)
