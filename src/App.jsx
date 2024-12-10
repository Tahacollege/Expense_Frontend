import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Header from './Pages/Header';
import Credit from './Pages/Credit';
import Debit from './Pages/Debit';
import Roll from './Pages/Roll';
import Prev_Trans from './Pages/Prev_Trans';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header/> {/* The Header remains constant across all routes */}
      
      {/* The main content of the app, which changes based on the route */}
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/credit" element={<Credit  />} />
        <Route path="/debit" element={<Debit  />} />
        <Route path="/roll" element={<Roll  />} />
        <Route path="/previous" element={<Prev_Trans />} />
        </Routes>
        </Router>
  )
}

export default App
