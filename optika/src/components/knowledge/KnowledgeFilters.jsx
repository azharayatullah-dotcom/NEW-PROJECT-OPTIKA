import { categories } from '../../data/categories'

const difficulties = ['beginner', 'intermediate', 'advanced']

// Only displays the controls. It does not store anything itself:
// the page owns the values and passes them in, with functions to change them.
function KnowledgeFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  onReset,
  counts,
}) {
  return (
    <div className="filters">
      <div className="filter-search">
        <label htmlFor="knowledge-search" className="filter-label">
          SEARCH
        </label>
        <input
          id="knowledge-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search topics, e.g. aperture"
        />
      </div>

      <div className="filter-group">
        <span className="filter-label">CATEGORY</span>
        <div className="chip-row">
          <button
            type="button"
            className="chip"
            aria-pressed={category === 'all'}
            onClick={() => onCategoryChange('all')}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              aria-pressed={category === item.id}
              onClick={() => onCategoryChange(item.id)}
            >
              {item.name} ({counts[item.id] ?? 0})
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">DIFFICULTY</span>
        <div className="chip-row">
          <button
            type="button"
            className="chip"
            aria-pressed={difficulty === 'all'}
            onClick={() => onDifficultyChange('all')}
          >
            All
          </button>
          {difficulties.map((level) => (
            <button
              key={level}
              type="button"
              className="chip"
              aria-pressed={difficulty === level}
              onClick={() => onDifficultyChange(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="reset-button" onClick={onReset}>
        Reset filters
      </button>
    </div>
  )
}

export default KnowledgeFilters