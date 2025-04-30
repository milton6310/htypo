import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App(props) {
  return (
    <div id="screen">
      <Header userPrincipal={props.loggedInPrincipal} />
      <Footer userPrincipal={props.loggedInPrincipal} />
    </div>
  );
}

export default App;
