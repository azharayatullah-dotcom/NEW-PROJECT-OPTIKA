// Assembled / Exploded buttons plus a slider for any point in between.
function ViewControls({ explode, onChange }) {
  return (
    <div className="view-controls">
      <div className="chip-row" role="group" aria-label="View mode">
        <button
          type="button"
          className="chip"
          aria-pressed={explode === 0}
          onClick={() => onChange(0)}
        >
          Assembled
        </button>
        <button
          type="button"
          className="chip"
          aria-pressed={explode === 1}
          onClick={() => onChange(1)}
        >
          Exploded
        </button>
      </div>

      <div className="slider-group">
        <label htmlFor="explode-slider" className="filter-label">
          EXPLODE {Math.round(explode * 100)}%
        </label>
        <input
          id="explode-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explode}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </div>
  )
}

export default ViewControls