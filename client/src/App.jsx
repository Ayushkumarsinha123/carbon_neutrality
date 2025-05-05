// App.jsx (basic structure)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import EmissionInputPage from './pages/EmissionInputPage';
import CarbonSinkPage from './pages/CarbonSinkPage';
import SimulationPage from './pages/SimulationPage';


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/emission" element={<EmissionInputPage />} />
          <Route path="/carbon-sink" element={<CarbonSinkPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
        {/* Other pages */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
