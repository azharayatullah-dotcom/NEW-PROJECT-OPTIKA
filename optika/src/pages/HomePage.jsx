import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">THE SCIENCE BEHIND PHOTOGRAPHY</p>

          <h1>
            Understand the
            <br />
            <span>Art of Seeing.</span>
          </h1>

          <p className="description">
            Explore the science, technology, and art behind
            photography. From understanding your camera to
            mastering the perfect exposure.
          </p>

          <div className="hero-actions">
            <Link to="/knowledge" className="primary-button">
              Start Exploring ↗
            </Link>
            <Link to="/camera-lab" className="secondary-button">
              Discover Camera Lab
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-frame">
            <div className="frame-label">OPTICAL SYSTEM / 001</div>
            <div className="lens">
              <div className="lens-inner">
                <div className="lens-core"></div>
              </div>
            </div>
            <div className="frame-footer">
              <span>FIG. 001 — CAMERA LENS</span>
              <span>35° 42' 18.2"</span>
            </div>
          </div>
        </div>
      </section>

      <section className="intro">
        <div>
          <p className="eyebrow">01 / KNOWLEDGE</p>
          <h2>Photography is more than just a picture.</h2>
        </div>
        <p>
          Learn how light, optics, and technology work together
          to create an image. Understand every element behind
          the camera.
        </p>
      </section>

      <section className="features">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h3>Knowledge Base</h3>
          <p>
            A growing encyclopedia of photography concepts,
            techniques, and terminology.
          </p>
          <Link to="/knowledge">Explore topics ↗</Link>
        </article>

        <article className="feature-card">
          <span className="feature-number">02</span>
          <h3>Camera Lab</h3>
          <p>
            Discover camera anatomy and understand how each
            component works.
          </p>
          <Link to="/camera-lab">Enter the lab ↗</Link>
        </article>

        <article className="feature-card">
          <span className="feature-number">03</span>
          <h3>Camera Archive</h3>
          <p>
            Explore camera systems, specifications, and
            photographic technology.
          </p>
          <Link to="/archive">Browse archive ↗</Link>
        </article>
      </section>
    </>
  )
}

export default HomePage