import './App.css';
import Home from './components/Homepage/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks/Tasks';
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
