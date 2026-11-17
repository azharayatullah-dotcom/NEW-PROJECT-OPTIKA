import { useState } from 'react'
import { categories } from '../data/categories'
import { articles } from '../data/articles'
import ArticleCard from '../components/knowledge/ArticleCard'
import KnowledgeFilters from '../components/knowledge/KnowledgeFilters'

function KnowledgePage() {
  // useState returns [current value, function to change it].
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')

  // Lookup table: 'exposure' -> 'Exposure'
  const categoryNames = Object.fromEntries(
    categories.map((item) => [item.id, item.name])
  )

  // How many articles each category has, for the filter buttons
  const counts = {}
  articles.forEach((article) => {
    counts[article.category] = (counts[article.category] ?? 0) + 1
  })

  // Keep only the articles that pass all three filters
  const search = query.trim().toLowerCase()
  const visibleArticles = articles.filter((article) => {
    const matchesCategory = category === 'all' || article.category === category
    const matchesDifficulty =
      difficulty === 'all' || article.difficulty === difficulty
    const matchesSearch =
      search === '' ||
      article.title.toLowerCase().includes(search) ||
      article.summary.toLowerCase().includes(search) ||
      article.definition.toLowerCase().includes(search)

    return matchesCategory && matchesDifficulty && matchesSearch
  })

  function resetFilters() {
    setQuery('')
    setCategory('all')
    setDifficulty('all')
  }

  return (
    <section className="knowledge">
      <header className="knowledge-header">
        <p className="eyebrow">01 / KNOWLEDGE BASE</p>
        <h1>Knowledge Base</h1>
        <p className="description">
          A structured encyclopedia of photography, from exposure and optics
          to composition and lighting.
        </p>
      </header>

      <KnowledgeFilters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onReset={resetFilters}
        counts={counts}
      />

      {/* aria-live lets screen readers announce the new count */}
      <p className="result-count" aria-live="polite">
        {visibleArticles.length} of {articles.length} articles
      </p>

      {visibleArticles.length > 0 ? (
        <div className="article-grid">
          {visibleArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              categoryName={categoryNames[article.category]}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No articles match these filters yet.</p>
          <button type="button" className="reset-button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  )
}

export default KnowledgePage