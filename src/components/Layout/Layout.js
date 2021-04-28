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

  const renderChatItems = (items) => {
    return items.map((item, i) => (
      <div
        key={i}
        style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}
      >
        <Avatar
          src="./image/discord.jpg"
          style={{ marginRight: 10 }}
          alt={item.username + i}
        />
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ marginRight: 10 }}>{item.username}</Typography>
            <Typography>{item.timestamps}</Typography>
          </div>
          <Typography>{item.message}</Typography>
        </div>
      </div>
    ));
  };

  return (
    <div className="app-container">
      <Sidebar sideBarOpen={sideBarOpen} onCloseSideBar={onCloseSideBar} />

      <MessageLayout onOpenSideBar={onOpenSideBar} sideBarOpen={sideBarOpen} />

      <ActiveUserList />
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
