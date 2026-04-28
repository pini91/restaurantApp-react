import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/adminLogin.css'

interface AlertMessage {
  msg: string
}

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<AlertMessage[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors([])
    setLoading(true)

    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors([{ msg: data.message ?? 'Invalid email or password.' }])
        return
      }

      navigate('/admin/dashboard')
    } catch {
      setErrors([{ msg: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      {errors.map((err, i) => (
        <div key={i} className="alert alert-danger">
          {err.msg}
        </div>
      ))}

      <div className="admin-login-container">
        <header>Admin Login</header>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <input
            className="admin-input top"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="admin-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="admin-submit"
            type="submit"
            value={loading ? 'Logging in...' : 'Login'}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}
