import { useState } from 'react'
import CameraScene from '../components/camera/CameraScene'
import PartInfoPanel from '../components/camera/PartInfoPanel'
import ViewControls from '../components/camera/ViewControls'

function CameraLabPage() {
  // The page owns both values, so the 3D view and the panels stay in sync.
  const [selectedId, setSelectedId] = useState(null)
  const [explode, setExplode] = useState(0) // 0 = assembled, 1 = exploded

  return (
    <section className="camera-lab">
      <header className="camera-lab-header">
        <p className="eyebrow">02 / CAMERA LAB</p>
        <h1>Camera Lab</h1>
        <p className="description">
          An interactive 3D camera for exploring components, anatomy and
          exploded views.
        </p>
      </header>

      <div className="camera-lab-layout">
        <div className="viewer-frame">
          <div className="viewer-label viewer-label-top">
            <span>VIEWER / DSLR · SIMPLIFIED MODEL</span>
            <span>DRAG TO ROTATE · SCROLL TO ZOOM · CLICK A PART</span>
          </div>

          <div
            className="viewer-canvas"
            role="img"
            aria-label="Interactive 3D viewer showing a simplified DSLR camera that can be assembled or exploded. Parts can also be chosen from the list."
          >
            <CameraScene
              selectedId={selectedId}
              onSelect={setSelectedId}
              explode={explode}
            />
          </div>

          <ViewControls explode={explode} onChange={setExplode} />

          <div className="viewer-label viewer-label-bottom">
            <span>STATUS: STYLISED MODEL · 17 PARTS</span>
            <span>NOT TO SCALE · LAYOUT VARIES BY CAMERA</span>
          </div>
        </div>

        <PartInfoPanel selectedId={selectedId} onSelect={setSelectedId} />
      </div>
    </section>
  )
}

export default CameraLabPage