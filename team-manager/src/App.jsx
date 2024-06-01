import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManagerPage from './pages/ManagerPage';
import AboutPage from './pages/AboutPage';

// Setup for single-page application using BrowserRouter
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/manage" element={<ManagerPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App
