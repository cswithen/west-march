import React from "react";
import NavigationHeader from "./NavigationHeader";

const Layout = (props) => {
  return (
    <div>
      <NavigationHeader />
      {props.children}
    </div>
  );
};

export default Layout;
