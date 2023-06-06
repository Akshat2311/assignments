import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { Header } from './Header';
import { AddOrder } from './screens/AddOrder';
import { GetOrder } from './screens/GetOrder';
import { Home } from './screens/Home';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/add-order" element={<AddOrder/>} />
        <Route path="/orders" element={<GetOrder/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
