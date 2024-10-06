import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignUp, PlanetsMatchingContainer, GameCompletedContainer } from './pages';

import { Auth } from './api';

const AuthResolver = () => {
  if (!Auth.getInstance().isLoggedIn())
    return <SignUp />;
  return <Navigate to="/app" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<PlanetsMatchingContainer />} />
        <Route path="/complete" element={<GameCompletedContainer />} />
        <Route path="/planet/:id" element={<SignUp />} />
        <Route path="/" element={<AuthResolver />} />
      </Routes>
    </Router>
  );
}

export default App;
