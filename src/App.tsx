import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignUp, PlanetCard } from './pages';

import { Planets } from './api/planets';

import './App.css';

function App() {
  // Get planets
  const planets = Planets.getInstance();
  planets.getPlanet("1").then((response) => {
    console.log(response);
  });

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
