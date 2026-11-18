import { Link } from 'react-router-dom'
import { cameraParts } from '../../data/cameraParts'

// Unique group names, in the order they first appear in the data
const groups = [...new Set(cameraParts.map((part) => part.group))]

function PartInfoPanel({ selectedId, onSelect }) {
  const selected = cameraParts.find((part) => part.id === selectedId)

  return (
    <aside className="parts-panel" aria-label="Camera parts">
      {/* aria-live lets screen readers announce the new selection */}
      <div className="part-details" aria-live="polite">
        {selected ? (
          <>
            <p className="filter-label">{selected.group.toUpperCase()}</p>
            <h2>{selected.name}</h2>
            <p className="part-summary">{selected.summary}</p>
            <p>{selected.explanation}</p>
            {selected.article && (
              <Link to={`/knowledge/${selected.article}`} className="text-link">
                Read the related article ↗
              </Link>
            )}
            <button
              type="button"
              className="reset-button"
              onClick={() => onSelect(null)}
            >
              Clear selection
            </button>
          </>
        ) : (
          <p>Select a part in the 3D view or from the list to see what it does.</p>
        )}
      </div>

      <p className="filter-label">PARTS ({cameraParts.length})</p>

      {groups.map((group) => (
        <div key={group}>
          <p className="parts-group">{group}</p>
          <ul className="parts-list">
            {cameraParts
              .filter((part) => part.group === group)
              .map((part) => (
                <li key={part.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === part.id}
                    onClick={() => onSelect(part.id)}
                  >
                    {part.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}

export default PartInfoPanel