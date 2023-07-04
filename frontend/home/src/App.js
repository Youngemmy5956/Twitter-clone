import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Counter from './Pages/Counter';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/counter" element={<Counter />} />


          </Routes>

      </BrowserRouter>

      
     
    </div>
  );
}

export default App;
