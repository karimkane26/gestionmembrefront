import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

// Affiche la page seulement si un utilisateur est connecté,
// sinon renvoie vers la page de connexion
function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
