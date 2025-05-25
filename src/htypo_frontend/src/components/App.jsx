import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { htypo } from "../../../declarations/htypo";

function App(props) {

  async function registerUser() {
    const result = await htypo.register(props.loggedInPrincipal);
    console.log("User registration result:", result);
  }
  
  useEffect(() => {
    registerUser();
  }, []);

  return (
    <div id="screen">
      <Header userId={props.loggedInPrincipal} />
      <Footer />
    </div>
  );
}

export default App;
