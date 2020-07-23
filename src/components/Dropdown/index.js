import * as React from "react";
import "./style.css";

const listDropdown = ["A-Z", "Z-A"];

const Dropdown = (props) => {
  const { show, value, handleToggle, handleBlur, handleChange } = props;

  return (
    <div className="dropdown-container">
      <label className="arrow">
        <input
          type="button"
          value={value}
          className="dropdown-btn"
          onClick={handleToggle}
          onBlur={handleBlur}
        />
      </label>
      <ul className="dropdown-list" hidden={!show}>
        {listDropdown.map((value, idx) => (
          <li className="option" key={idx} onClick={handleChange(value)}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
