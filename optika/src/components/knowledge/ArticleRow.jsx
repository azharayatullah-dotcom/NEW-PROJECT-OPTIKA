import { Link } from 'react-router-dom'

// One line in an index-style list. The whole row is a single link,
// which gives a large, easy click target.
function ArticleRow({ article, categoryName, number }) {
  return (
    <Link to={`/knowledge/${article.slug}`} className="article-row">
      <span className="article-row-number">{number}</span>
      <span className="article-row-main">
        <span className="article-row-title">{article.title}</span>
        <span className="article-row-summary">{article.summary}</span>
      </span>
      <span className="article-row-meta">
        <span>{categoryName}</span>
        <span className={`difficulty difficulty-${article.difficulty}`}>
          {article.difficulty}
        </span>
      </span>
      <span className="article-row-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  )
}

export default ArticleRow