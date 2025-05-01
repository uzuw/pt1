import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Add from './pages/Add';
import Settings from './pages/Settings';
import Projects from './pages/Projects';
import Recent from './pages/Recent';
import Home from './pages/Home';

const App = () => {
  return (
    <div className=" min-h-screen w-full relative">
    <Navbar/>
    <div className="">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path="/history" element={<Recent/>} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
