import React from 'react'
import './style.css'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Dashboard } from './components/Dashboard';
import Membre from './components/Membre';
function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route  path='/admin-dashboard' element={<Dashboard />} >
          <Route path='/admin-dashboard/membre' element={<Membre />} />

          </Route>
        
      </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App