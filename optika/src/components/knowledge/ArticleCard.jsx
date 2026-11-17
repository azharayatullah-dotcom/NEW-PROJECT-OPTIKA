import { Link } from 'react-router-dom'

// Shows one article as a card. All the data arrives through props.
function ArticleCard({ article, categoryName }) {
  return (
    <article className="article-card">
      <div className="article-card-meta">
        <span>{categoryName}</span>
        <span className={`difficulty difficulty-${article.difficulty}`}>
          {article.difficulty}
        </span>
      </div>

      <h3>{article.title}</h3>
      <p>{article.summary}</p>

      <Link to={`/knowledge/${article.slug}`}>Read article ↗</Link>
    </article>
  )
}

export default ArticleCard