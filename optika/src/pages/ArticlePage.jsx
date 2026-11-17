import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/articles'
import { categories } from '../data/categories'
import NotFoundPage from './NotFoundPage'

function ArticlePage() {
  // useParams reads the changing part of the URL: /knowledge/:slug
  const { slug } = useParams()

  const article = articles.find((item) => item.slug === slug)

  // No article with this slug: show the 404 page instead of crashing
  if (!article) {
    return <NotFoundPage />
  }

  const category = categories.find((item) => item.id === article.category)

  // Turn the list of related slugs into real articles.
  // filter(Boolean) drops any slug that does not exist yet.
  const relatedArticles = article.related
    .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
    .filter(Boolean)

  return (
    <article className="article-page">
      <Link to="/knowledge" className="back-link">
        ← Back to Knowledge Base
      </Link>

      <header className="article-header">
        <div className="article-card-meta">
          <span>{category ? category.name : article.category}</span>
          <span className={`difficulty difficulty-${article.difficulty}`}>
            {article.difficulty}
          </span>
        </div>
        <h1>{article.title}</h1>
        <p className="article-definition">{article.definition}</p>
      </header>

      <div className="article-layout">
        <nav className="article-contents" aria-label="Contents">
          <p className="filter-label">CONTENTS</p>
          <ol>
            {article.sections.map((section, index) => (
              <li key={section.heading}>
                <a href={`#section-${index}`}>{section.heading}</a>
              </li>
            ))}
            {article.examples.length > 0 && (
              <li>
                <a href="#examples">Practical examples</a>
              </li>
            )}
          </ol>
        </nav>

        <div className="article-body">
          {article.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index}`}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </section>
          ))}

          {article.examples.length > 0 && (
            <section id="examples">
              <h2>Practical examples</h2>
              <ul>
                {article.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </section>
          )}

          {article.simplifiedNote && (
            <aside className="simplified-note">
              <p className="filter-label">SIMPLIFIED MODEL</p>
              <p>{article.simplifiedNote}</p>
            </aside>
          )}

          {relatedArticles.length > 0 && (
            <section>
              <h2>Related concepts</h2>
              <ul className="related-list">
                {relatedArticles.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/knowledge/${item.slug}`}>{item.title} ↗</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.references.length > 0 && (
            <section>
              <h2>References</h2>
              <ul>
                {article.references.map((reference) => (
                  <li key={reference.label}>
                    {reference.url ? (
                      <a href={reference.url}>{reference.label}</a>
                    ) : (
                      reference.label
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}

export default ArticlePage