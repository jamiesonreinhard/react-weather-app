import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';  // Import the Main component
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="bg-dark min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
