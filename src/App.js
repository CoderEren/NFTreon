import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import ElonMusk from './elonmusk.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/elonmusk' element={<ElonMusk />} />
      </Routes>
    </Router>
  );
}

export default App;
