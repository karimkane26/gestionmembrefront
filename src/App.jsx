import React from 'react'
import './style.css'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Dashboard } from './components/Dashboard';
import Membre from './components/Membre';
import Cotisation from './components/Cotisation';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route  path='/admin-dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route path='/admin-dashboard/membre' element={<Membre />} />
          <Route path='/admin-dashboard/cotisation' element={<Cotisation />} />
          <Route path='/admin-dashboard/logout' element={<Logout />} />
          </Route>
        
      </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App