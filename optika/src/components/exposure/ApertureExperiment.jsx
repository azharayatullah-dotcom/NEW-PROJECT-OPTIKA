import { useState } from 'react'
import {
  COC_MM,
  blurDiameterMm,
  depthOfField,
  fStops,
  formatMetres,
} from '../../utils/optics'

// Six test targets placed at these distances from the camera (metres).
const targetDistances = [1, 2, 3, 5, 8, 15]
const MAX_DISTANCE = 20 // the right edge of the top-down diagram

function ApertureExperiment() {
  // Sliders store a number. The aperture slider stores a position in the
  // fStops list, so it only lands on real f-numbers.
  const [stopIndex, setStopIndex] = useState(2) // f/2.8
  const [focalMm, setFocalMm] = useState(50)
  const [focusM, setFocusM] = useState(3)

  const fNumber = fStops[stopIndex]
  const dof = depthOfField({ focalMm, fNumber, distanceM: focusM })

  // Where the sharp zone ends on the diagram (clipped to the diagram width)
  const farEdge = Math.min(dof.farM, MAX_DISTANCE)
  const toPercent = (metres) => (metres / MAX_DISTANCE) * 100

  const targets = targetDistances.map((distance) => {
    const blurMm = blurDiameterMm({
      focalMm,
      fNumber,
      focusM,
      objectM: distance,
    })
    // How many times larger than the "acceptably sharp" disc this blur is
    const ratio = blurMm / COC_MM
    return {
      distance,
      inFocus: distance >= dof.nearM && distance <= dof.farM,
      // Illustrative: blur in screen pixels, capped so it stays readable
      blurPx: Math.min(ratio * 1.2, 9),
    }
  })

  return (
    <div className="experiment">
      <div className="experiment-controls">
        <div className="slider-row">
          <label htmlFor="exp-aperture" className="filter-label">
            APERTURE f/{fNumber}
          </label>
          <input
            id="exp-aperture"
            type="range"
            min="0"
            max={fStops.length - 1}
            step="1"
            value={stopIndex}
            onChange={(event) => setStopIndex(Number(event.target.value))}
          />
        </div>

        <div className="slider-row">
          <label htmlFor="exp-focal" className="filter-label">
            FOCAL LENGTH {focalMm} mm
          </label>
          <input
            id="exp-focal"
            type="range"
            min="24"
            max="200"
            step="1"
            value={focalMm}
            onChange={(event) => setFocalMm(Number(event.target.value))}
          />
        </div>

        <div className="slider-row">
          <label htmlFor="exp-distance" className="filter-label">
            FOCUS DISTANCE {focusM.toFixed(1)} m
          </label>
          <input
            id="exp-distance"
            type="range"
            min="0.5"
            max="20"
            step="0.1"
            value={focusM}
            onChange={(event) => setFocusM(Number(event.target.value))}
          />
        </div>
      </div>

      <dl className="experiment-readout" aria-live="polite">
        <div>
          <dt>Near limit</dt>
          <dd>{formatMetres(dof.nearM)}</dd>
        </div>
        <div>
          <dt>Far limit</dt>
          <dd>{formatMetres(dof.farM)}</dd>
        </div>
        <div>
          <dt>Depth of field</dt>
          <dd>
            {dof.farM === Infinity
              ? '∞'
              : formatMetres(dof.farM - dof.nearM)}
          </dd>
        </div>
        <div>
          <dt>Hyperfocal</dt>
          <dd>{formatMetres(dof.hyperfocalM)}</dd>
        </div>
      </dl>

      {/* Top-down diagram: camera on the left, distance runs to the right */}
      <figure className="dof-diagram">
        <div className="dof-track">
          <div
            className="dof-zone"
            style={{
              left: `${toPercent(dof.nearM)}%`,
              width: `${toPercent(farEdge) - toPercent(dof.nearM)}%`,
            }}
          />
          <div
            className="dof-focus"
            style={{ left: `${toPercent(focusM)}%` }}
          />
          {targetDistances.map((distance) => (
            <span
              key={distance}
              className="dof-tick"
              style={{ left: `${toPercent(distance)}%` }}
            >
              {distance} m
            </span>
          ))}
        </div>
        <figcaption>
          Top view. Cyan band = acceptably sharp zone. Amber line = focus
          distance. Camera is at the left edge.
        </figcaption>
      </figure>

      {/* Photo-style strip: the same six targets as they would look */}
      <figure className="dof-photo">
        <svg
          viewBox="0 0 600 170"
          role="img"
          aria-label="Six test targets at increasing distance. Targets outside the sharp zone are drawn blurred."
        >
          <defs>
            {targets.map((target) => (
              <filter
                key={target.distance}
                id={`blur-${target.distance}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation={target.blurPx} />
              </filter>
            ))}
          </defs>

          {targets.map((target, index) => (
            <g
              key={target.distance}
              transform={`translate(${50 + index * 100} 75)`}
            >
              <g filter={`url(#blur-${target.distance})`}>
                <circle r="34" fill="none" stroke="#65D5E8" strokeWidth="4" />
                <circle r="20" fill="none" stroke="#B6C9D5" strokeWidth="4" />
                <circle r="7" fill="#E7A957" />
                <line x1="-42" x2="42" y1="0" y2="0" stroke="#B6C9D5" strokeWidth="2" />
                <line y1="-42" y2="42" x1="0" x2="0" stroke="#B6C9D5" strokeWidth="2" />
              </g>
              <text
                y="66"
                textAnchor="middle"
                fill={target.inFocus ? '#65D5E8' : '#91aab5'}
                fontFamily="DM Mono, monospace"
                fontSize="11"
              >
                {target.distance} m
              </text>
              <text
                y="82"
                textAnchor="middle"
                fill={target.inFocus ? '#65D5E8' : '#91aab5'}
                fontFamily="DM Mono, monospace"
                fontSize="9"
              >
                {target.inFocus ? 'SHARP' : 'BLURRED'}
              </text>
            </g>
          ))}
        </svg>
        <figcaption>
          Illustrative drawing. The blur amount follows the lens formula, but
          the on-screen blur is not a physically accurate camera simulation.
        </figcaption>
      </figure>

      <aside className="simplified-note">
        <p className="filter-label">HOW TO READ THIS</p>
        <p>
          Numbers use the thin-lens depth-of-field formulas with a circle of
          confusion of {COC_MM} mm, the usual convention for a full-frame
          sensor. Smaller sensors use smaller values, and the result also
          depends on print size and viewing distance, so treat the limits as
          estimates. Try it: widen the aperture, or lengthen the focal
          length, or move closer, and the sharp zone shrinks.
        </p>
      </aside>
    </div>
  )
}

export default ApertureExperiment