import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = "Togglable";

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      {visible && props.children}
      <button className="btn btn-secondary" onClick={toggleVisibility}>{visible ? "cancel" : props.buttonLabel}</button>
    </div>
  );
});

export default Togglable;
