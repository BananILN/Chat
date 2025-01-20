import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';


function App() {

  const { user } = useSelector((state) => state.user);

  return (
    <Router>
    <Routes>
   
      <Route
        path="/"
        element={user ? <Navigate to="/chat" /> : <Login />}
      />
      
      <Route
        path="/chat"
        element={user ? <Chat /> : <Navigate to="/" />}
      />
     
      <Route
        path="/login"
        element={<Login />}
      />
    </Routes>
  </Router>
 
  );
}

export default App;
