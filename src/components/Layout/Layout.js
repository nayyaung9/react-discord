import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import Sidebar from "../Sidebar/Sidebar";
import { Avatar } from "@material-ui/core";
import MessageLayout from "../Message/MessageLayout";
import "./layout.css";
import ActiveUserList from "../Users/ActiveUserList";

function Layout(props) {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const [activeUserOpen, setActiveUserOpen] = React.useState(false);

  const onOpenSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const onCloseSideBar = () => {
    setSideBarOpen(false);
  };

  const onOpenActiveUser = () => {
    setActiveUserOpen(!activeUserOpen);
  };

  const onCloseActiveUser = () => {
    setActiveUserOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar sideBarOpen={sideBarOpen} onCloseSideBar={onCloseSideBar} />

      <MessageLayout
        onOpenSideBar={onOpenSideBar}
        sideBarOpen={sideBarOpen}
        onOpenActiveUser={onOpenActiveUser}
        activeUserOpen={activeUserOpen}
      />

      <ActiveUserList
        activeUserOpen={activeUserOpen}
        onCloseActiveUser={onCloseActiveUser}
      />
    </div>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
