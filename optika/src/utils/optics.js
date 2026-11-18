// Optics calculations, kept apart from the screen code so they are easy to
// test and reuse. All lens sizes are in millimetres, distances in metres.

// Full-stop f-numbers
export const fStops = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22]

// Circle of confusion: the largest blur disc still treated as "sharp".
// 0.03 mm is the common convention for a full-frame (36 x 24 mm) sensor.
// Other sensor sizes use other values, so results are estimates.
export const COC_MM = 0.03

// Near and far limits of acceptable sharpness (thin-lens model).
export function depthOfField({ focalMm, fNumber, distanceM, cocMm = COC_MM }) {
  const f = focalMm
  const s = distanceM * 1000 // focus distance in mm

  // Hyperfocal distance: focus here and everything from about half this
  // distance to infinity is acceptably sharp.
  const hyperfocal = (f * f) / (fNumber * cocMm) + f

  const near = (s * (hyperfocal - f)) / (hyperfocal + s - 2 * f)
  const far =
    s >= hyperfocal ? Infinity : (s * (hyperfocal - f)) / (hyperfocal - s)

  return {
    hyperfocalM: hyperfocal / 1000,
    nearM: near / 1000,
    farM: far === Infinity ? Infinity : far / 1000,
  }
}

// Diameter (mm) of the blur disc that a point at objectM makes on the sensor,
// when the lens is focused at focusM.
export function blurDiameterMm({ focalMm, fNumber, focusM, objectM }) {
  const f = focalMm
  const s = focusM * 1000
  const d = objectM * 1000
  return ((f * f) / (fNumber * (s - f))) * (Math.abs(d - s) / d)
}

// Show distances neatly: 2.73 m, 12.4 m, or "infinity"
export function formatMetres(value) {
  if (value === Infinity) return '∞'
  return `${value < 10 ? value.toFixed(2) : value.toFixed(1)} m`
}