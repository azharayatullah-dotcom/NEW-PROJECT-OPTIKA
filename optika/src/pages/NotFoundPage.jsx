import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page-placeholder">
      <p className="eyebrow">ERROR / 404</p>
      <h1>Page not found</h1>
      <p className="description">
        This address does not match any page in OPTIKA.
      </p>
      <div className="hero-actions">
        <Link to="/" className="primary-button">
          Return home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage