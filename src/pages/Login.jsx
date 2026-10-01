import React, { use, useState } from 'react'
import {useNavigate}  from 'react-router'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'
function Login() {
  const {login} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.post('/api/auth/login',{email,password})
      console.log(response.data);
      if(response.data.success){
        await login(response.data.membre,response.data.token)
        toast.success('connexion reuissi')
        navigate('/admin-dashboard')
      }
      else{
        toast.error("response.data.error")
      }
      
    } catch (error) {
      if(error.response){
        setError(error.response.data.message)
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-vert-fonce via-noir to-or-fonce px-4 py-10'>
      {/* Décor : cercles lumineux */}
      <div className='pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-or/30 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-32 -right-32 h-112 w-md rounded-full bg-vert/30 blur-3xl' />
      <div className='pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-or-clair/10 blur-3xl' />

      <div className='relative w-full max-w-md'>
        {/* Carte */}
        <div className='rounded-3xl border border-white/15 bg-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl'>
          {/* Logo */}
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-or-clair to-or shadow-lg shadow-or/40 ring-4 ring-white/10'>
            <span className='text-3xl font-extrabold tracking-tight text-noir'>NHO</span>
          </div>

          <div className='mb-8 text-center'>
            <h1 className='text-2xl font-bold text-white'>Bienvenue</h1>
            <p className='mt-1 text-sm text-gris-clair/70'>
              Connectez-vous pour gérer les membres NHO
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Email */}
            <div>
              <label htmlFor='email' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-or-clair'>
                Email
              </label>
              <div className='group relative'>
                <svg className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gris transition-colors group-focus-within:text-or' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.8'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' />
                </svg>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='nom@exemple.com'
                  required
                  className='w-full rounded-xl border border-white/10 bg-white/90 py-3 pl-12 pr-4 text-sm text-noir placeholder:text-gris shadow-inner outline-none transition focus:border-or focus:bg-white focus:ring-4 focus:ring-or/30'
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor='password' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-or-clair'>
                Mot de passe
              </label>
              <div className='group relative'>
                <svg className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gris transition-colors group-focus-within:text-or' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.8'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' />
                </svg>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  className='w-full rounded-xl border border-white/10 bg-white/90 py-3 pl-12 pr-12 text-sm text-noir placeholder:text-gris shadow-inner outline-none transition focus:border-or focus:bg-white focus:ring-4 focus:ring-or/30'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gris transition hover:text-or cursor-pointer'
                >
                  {showPassword ? (
                    <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.8'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                    </svg>
                  ) : (
                    <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.8'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className='flex items-center justify-between text-xs'>
              <label className='flex cursor-pointer items-center gap-2 text-gris-clair/80'>
                <input type='checkbox' className='h-4 w-4 cursor-pointer rounded accent-or' />
                Se souvenir de moi
              </label>
              <a href='#' className='font-medium text-or-clair transition hover:text-or hover:underline'>
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton */}
            <button
              type='submit'
              className='w-full cursor-pointer rounded-xl bg-linear-to-r from-or-clair via-or to-or-sable py-3 text-sm font-bold uppercase tracking-wider text-noir shadow-lg shadow-or/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-or/50 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-or/40'
            >
              Se connecter
            </button>
          </form>
        </div>

        <p className='mt-6 text-center text-xs text-gris-clair/50'>
          © {new Date().getFullYear()} NHO — Gestion des membres
        </p>
      </div>
    </section>
  )
}

export default Login
