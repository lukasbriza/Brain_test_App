import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Home } from '../Pages/Home'
import { Calculations } from '../Pages/Calculations'

import { AppContextProvider } from './Context'

//BROWSER HISTORY//
const history = createBrowserHistory()

function App() {

  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={Home} />
            <Route path="calculations" element={Calculations} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
