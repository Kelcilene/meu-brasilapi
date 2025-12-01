import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard' 

function App() {
  // Simplesmente verifica se há um token JWT no localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  )

  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  // Se estiver autenticado, mostra o conteúdo principal, senão, a tela de Login
  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} /> 
  }

  return <LoginPage onLogin={handleLogin} />
}

export default App