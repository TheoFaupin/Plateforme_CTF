import React from 'react';
import { NavLink } from "react-router-dom";

const RenderLogin = () => {
  return (
    <div className="title header double-divider">
      You do not have access to this page, please register or log in!
      <div className="double-divider">
        <button className="button is-link">
          <NavLink exact="true" className="button is-link" to="/register">
            Register
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default RenderLogin;
