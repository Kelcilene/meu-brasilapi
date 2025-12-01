import { LoginForm } from '../components/LoginForm'

export default function LoginPage({ onLogin }) {
  return (
    <div style={{ padding: '50px' }}>
      <LoginForm onLogin={onLogin} />
    </div>
  )
}