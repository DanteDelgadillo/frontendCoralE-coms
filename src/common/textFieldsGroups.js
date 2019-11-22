import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroups = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disable
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disable}
      />
      {info && <small className="from-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroups.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.string
};

TextFieldGroups.defaultProps = {
  type: "text"
};

export default TextFieldGroups;
