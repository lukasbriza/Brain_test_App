
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { Menu } from '../Components/Menu'
import { Home } from '../Pages/Home'
import { Calculations } from '../Pages/Calculations'
import { Transition } from './Transition'

import { AppContextProvider } from './Context'


function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="app rootComponent">
          <Menu />
          <RouteComp />
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

const RouteComp = () => {
  const location = useLocation()
  return (
    <Transition location={location}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/calculations" element={<Calculations />} />
      </Routes>
    </Transition>
  )
}
export default App;
