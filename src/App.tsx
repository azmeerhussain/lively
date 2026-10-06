import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import WeeklySchedule from './pages/WeeklySchedule';
import Questionnaire from './pages/Questionnaire';
import "./FitnessQuestionnaire.css";
import { AuthProviderLayout } from './layout/AuthProviderLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/app/:userId" element={<AuthProviderLayout/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="schedule" element={<WeeklySchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;