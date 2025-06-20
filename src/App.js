import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateSurvey from './pages/CreateSurvey';
import SurveyDetail from './pages/SurveyDetail';
import PublicSurvey from './pages/PublicSurvey';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateSurvey />} />
        <Route path="/survey/:id" element={<SurveyDetail />} />
        <Route path="/public/:id" element={<PublicSurvey />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
