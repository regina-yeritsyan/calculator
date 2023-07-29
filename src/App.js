import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


import Calculator from "./pages/Calculator";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/calculator" />}/>
            <Route path='/calculator' element={<Calculator/>}/>
          </Routes>
        </BrowserRouter>
    );
  }
}

export default App;
