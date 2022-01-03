import React from "react";
import NavigationHeader from "./NavigationHeader";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <NavigationHeader />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
