import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignUp, PlanetCard } from './pages';

import './App.css';

function App() {
  return (
    <Router>
      { 
        <nav>
        <ul>
          <Link to="/signup">Sign Up</Link>
        </ul>
      </nav>}

      <Routes>
        <Route path="/" element={<PlanetCard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
