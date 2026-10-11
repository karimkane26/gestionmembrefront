import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

function Logout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    toast.success('Déconnexion réussie', { toastId: 'logout' })
    
    navigate('/', { replace: true })
  }, [])

  return null
}

export default Logout
