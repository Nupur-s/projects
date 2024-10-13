import './App.css';
import {BrowserRouter, Routes, Route, Navigate}from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inventory from './components/Inventory';
import Buy from './components/Buy';
import Login from './components/Login';
import AuthProvider, { authContext, useAuth } from './components/AuthContext';

function AuthenticatedRoute({children}){
  const authContext = useAuth();
  if(authContext.authenticated){
    return children;
  }

  return <Navigate to="/"></Navigate>
}

function App() {
  return (
    <div className="App">
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/inventory" element ={<AuthenticatedRoute><Inventory /></AuthenticatedRoute>}></Route>
        <Route path="/buy" element ={<AuthenticatedRoute><Buy /></AuthenticatedRoute>}></Route>
        <Route path="/" element ={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

    </div>
  );
}

export default App;
