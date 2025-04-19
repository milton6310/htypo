import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";

function App(props) {
  const [isSidebarHidden, setSidebarHidden] = useState(true);

  function toggleSidebar(hidden) {
    console.log("toggle sidebar", hidden);
    setSidebarHidden(hidden);
  }

  return (
    <div id="screen">
      <Header onShowSidebar={toggleSidebar} />
      <Navbar hidden={isSidebarHidden} />
      <Outlet />
      <Footer userPrincipal={props.loggedInPrincipal} />
    </div>
  );
}

export default App;
