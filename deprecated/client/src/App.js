import { 
  BrowserRouter as Router,
  Routes, 
  Route, 
  useLocation 
} from "react-router";


import logo from './assets/images/logo.svg';
import { AnimatePresence } from "framer-motion";

import Home from './pages/home/Home';
import Appointments from './pages/appointments/Appointments';
import Profile from './pages/profile/Profile';
import NotFound from './layouts/NotFound';

function App() {

    const location = useLocation();
    return <>
    {}
    <AnimatePresence exitBeforeEnter>
    <logo> </logo>
    <Routes location={location} key ={location.pathname}>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/appointments" element={<Appointments />}/>
      <Route exact path="/profile" element={<Profile />}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
    </AnimatePresence>
    
    </>
}

export default App
