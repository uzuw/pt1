import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="p-4">
        <Routes>
          <Route path="/" element={<h1>Home🏠</h1>} />
          <Route path="/add" element={<h1>add➕</h1>} />
          <Route path="/projects" element={<h1>projects📃</h1>} />
          <Route path="/history" element={<h1>history⌛</h1>} />
          <Route path="/profile" element={<h1>profile🙅‍♂️</h1>} />
          <Route path="/settings" element={<h1>settings⚙️</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
