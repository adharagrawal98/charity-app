import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home';

function App() {
  return (
    < >
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
