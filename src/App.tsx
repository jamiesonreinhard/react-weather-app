import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page and component imports
import Navbar from './components/navigation/Navbar';
import City from './pages/City';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <div className="bg-dark min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:id" element={<City />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
