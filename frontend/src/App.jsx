import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './home/HomePage';
import ManagerPage from './manage/ManagerPage';
import AboutPage from './about/AboutPage';

// Setup for single-page application using BrowserRouter
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/manage/" element={<ManagerPage />} />
        <Route path="/about/" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App
