import Home from './pages/Home'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import More from './pages/More'
import Recent from './pages/Recent'
import Settings from './pages/Settings'
import Add from "./pages/Add"

const App = () => {
  return (
    <>
    <div className="bg-white min-h-screen w-full relative">
    <Navbar/>
    <div className="">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/projects" element={<More/>} />
          <Route path="/history" element={<Recent/>} />
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
