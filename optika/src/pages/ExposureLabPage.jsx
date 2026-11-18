import ApertureExperiment from '../components/exposure/ApertureExperiment'

// Add a new experiment here when it is built. Only entries with a
// "component" are shown as live; the rest are listed as planned.
const experiments = [
  {
    id: 'aperture',
    number: '01',
    title: 'Aperture & depth of field',
    component: ApertureExperiment,
  },
  { id: 'shutter', number: '02', title: 'Shutter speed & motion' },
  { id: 'iso', number: '03', title: 'ISO & image noise' },
  { id: 'focal', number: '04', title: 'Focal length & field of view' },
  { id: 'triangle', number: '05', title: 'Exposure triangle' },
]

function ExposureLabPage() {
  const live = experiments.filter((item) => item.component)
  const planned = experiments.filter((item) => !item.component)

  return (
    <section className="exposure-lab">
      <header className="camera-lab-header">
        <p className="eyebrow">04 / EXPOSURE LAB</p>
        <h1>Exposure Lab</h1>
        <p className="description">
          Interactive experiments for aperture, shutter speed, ISO and focal
          length. Each one says clearly what is calculated and what is only
          illustrated.
        </p>
      </header>

      {live.map((item) => {
        const Experiment = item.component
        return (
          <section key={item.id} className="experiment-block">
            <p className="eyebrow">EXPERIMENT {item.number}</p>
            <h2>{item.title}</h2>
            <Experiment />
          </section>
        )
      })}

      <section className="experiment-block">
        <p className="eyebrow">COMING NEXT</p>
        <ul className="planned-list">
          {planned.map((item) => (
            <li key={item.id}>
              <span>{item.number}</span> {item.title}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default ExposureLabPage