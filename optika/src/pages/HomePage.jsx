import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { categories } from '../data/categories'
import { featuredSlugs, recentCount } from '../data/home'
import ArticleRow from '../components/knowledge/ArticleRow'

// The main sections of the site, shown as shortcuts.
const modules = [
  {
    number: '01',
    title: 'Knowledge Base',
    text: 'A growing encyclopedia of photography concepts, techniques and terminology.',
    to: '/knowledge',
    cta: 'Explore topics',
  },
  {
    number: '02',
    title: 'Camera Lab',
    text: 'Discover camera anatomy and understand how each component works.',
    to: '/camera-lab',
    cta: 'Enter the lab',
  },
  {
    number: '03',
    title: 'Camera Archive',
    text: 'Explore camera systems, specifications and photographic technology.',
    to: '/archive',
    cta: 'Browse archive',
  },
  {
    number: '04',
    title: 'Exposure Lab',
    text: 'Interactive experiments for aperture, shutter speed, ISO and focal length.',
    to: '/exposure-lab',
    cta: 'Open experiments',
  },
]

function HomePage() {
  // Lookup table: 'optics' -> 'Optics'
  const categoryNames = Object.fromEntries(
    categories.map((item) => [item.id, item.name])
  )

  // Turn the featured slugs into real articles. filter(Boolean) drops
  // any slug that does not exist, so a typo cannot crash the page.
  const featured = featuredSlugs
    .map((slug) => articles.find((item) => item.slug === slug))
    .filter(Boolean)

  // Newest first. [...articles] makes a copy, so the original list
  // is not reordered. Dates are 'YYYY-MM-DD' text, which sorts correctly.
  const recent = [...articles]
    .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
    .slice(0, recentCount)

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

      {featured.length > 0 && (
        <section className="home-section">
          <div className="home-section-head">
            <div>
              <p className="eyebrow">FEATURED TOPICS</p>
              <h2>Start with the fundamentals</h2>
            </div>
            <Link to="/knowledge" className="text-link">
              All articles ↗
            </Link>
          </div>

          <div className="article-rows">
            {featured.map((article, index) => (
              <ArticleRow
                key={article.slug}
                article={article}
                categoryName={categoryNames[article.category]}
                number={String(index + 1).padStart(2, '0')}
              />
            ))}
          </div>
        </section>
      )}

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="eyebrow">RECENTLY ADDED</p>
            <h2>New in the archive</h2>
          </div>
        </div>

        <div className="article-rows">
          {recent.map((article) => (
            <ArticleRow
              key={article.slug}
              article={article}
              categoryName={categoryNames[article.category]}
              number={article.dateAdded}
            />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="eyebrow">MODULES</p>
            <h2>Explore OPTIKA</h2>
          </div>
        </div>
      </section>

      <section className="features modules">
        {modules.map((item) => (
          <article className="feature-card" key={item.to}>
            <span className="feature-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to={item.to}>{item.cta} ↗</Link>
          </article>
        ))}
      </section>
    </>
  )
}

export default HomePage