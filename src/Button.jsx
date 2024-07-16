// Button.js
import PropTypes from "prop-types";

import "./globalStyles.css"; // Ensure global styles are imported

const Button = ({
  onClick,
  children,
  variant = "primary", // Default to primary variant if not specified
  disabled = false,
  className = "",
}) => {
  const classNames = `button ${variant} ${className}`; // Ensure 'button' class is included

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]), // Specify possible variants
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
