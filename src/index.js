import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";
import { AnimatePresence } from "framer-motion";
{/*after 2.0*/ }
//import { createStore } from "redux"
//import { Provider } from "react-redux";
//import myReducers from "./context/actions/reducers";

//const myStore = createStore(reducer);

{/*after 2.0*/ }
ReactDOM.render(
  <Router>

    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimatePresence>
        <App />
      </AnimatePresence>

    </StateProvider>
  </Router>,
  document.getElementById("root")
);
