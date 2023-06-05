import { React } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div initial="hidden" animate="show">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    </motion.div>
  );
}
export default App;


