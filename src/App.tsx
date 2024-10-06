import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignUp, PlanetCard } from './pages';

import { Planets } from './api/planets';

function App() {
  // Get planets
  const planets = Planets.getInstance();
  planets.getPlanet("1").then((response) => {
    console.log(response);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetCard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
