import CameraScene from '../components/camera/CameraScene'

function CameraLabPage() {
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

      <div className="viewer-frame">
        <div className="viewer-label viewer-label-top">
          <span>VIEWER / TEST</span>
          <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
        </div>

        <div
          className="viewer-canvas"
          role="img"
          aria-label="Interactive 3D viewer showing a placeholder box. Drag to rotate."
        >
          <CameraScene />
        </div>

        <div className="viewer-label viewer-label-bottom">
          <span>STATUS: 3D ENGINE TEST</span>
          <span>PLACEHOLDER OBJECT</span>
        </div>
      </div>
    </section>
  )
}

export default CameraLabPage