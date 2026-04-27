import { Link } from 'react-router-dom'

export default function FinalEditPage() {
  return (
    <section
      className="container"
      style={{
        position: 'relative',
        maxWidth: 400,
        width: '100%',
        background: '#fff',
        padding: 25,
        borderRadius: 8,
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        margin: '5% auto',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <p>You have successfully canceled your reservation ✓</p>
      <button style={{ marginTop: 16, cursor: 'pointer' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          Go to main page
        </Link>
      </button>
    </section>
  )
}
