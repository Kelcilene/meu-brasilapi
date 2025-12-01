import { useState } from 'react'
import api from '../services/api' // Você criará este arquivo

// Recebe a função onLogin do App.jsx
export function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // Limpa erros anteriores

    try {
      // 1. Envia credenciais para a sua rota de login (Express)
      const response = await api.post('/auth/login', { username, password })
      
      const { token } = response.data

      // 2. Salva o token e notifica o App.jsx
      onLogin(token)
      
    } catch (err) {
      // 3. Exibe a mensagem de erro do servidor (Ex: Credenciais inválidas)
      const errorMessage = err.response?.data?.error || 'Erro de conexão com o servidor.'
      setError(errorMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Acesso ao Sistema</h2>
      <div>
        <label htmlFor="username">Usuário:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Entrar</button>
    </form>
  )
}