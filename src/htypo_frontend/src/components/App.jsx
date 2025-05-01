import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function App(props) {
  return (
    <div id="screen">
      <Header userPrincipal={props.loggedInPrincipal} />
      <Footer userPrincipal={props.loggedInPrincipal} />
    </div>
  );
}

export default App;
