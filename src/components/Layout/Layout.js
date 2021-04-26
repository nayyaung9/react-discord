import React from "react";
import PropTypes from "prop-types"; // ES6
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Sidebar />
      {children}
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
