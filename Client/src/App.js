import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./page";

function App() {
  return (
    <Fragment>
   
      <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        </Fragment>
      
  );
}

export default App;
