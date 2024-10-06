import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignUp, PlanetsContainer, GameCompleted } from './pages';

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
        <Route path="/app" element={<PlanetsContainer />} />
        <Route path="/complete" element={<GameCompleted />} />
        <Route path="/" element={<AuthResolver />} />
      </Routes>
    </Router>
  );
}

export default App;
