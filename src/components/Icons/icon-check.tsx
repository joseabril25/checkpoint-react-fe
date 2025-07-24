export const IconCheck = ({...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 32}
    height={props.height || 32}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={props.color || "#080341"}
      fillRule="evenodd"
      d="M17.03 8.78 9 16.81l-3.53-3.53 1.06-1.06L9 14.69l6.97-6.97 1.06 1.06Z"
      clipRule="evenodd"
    />
  </svg>
)
