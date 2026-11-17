import { Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import KnowledgePage from './pages/KnowledgePage'
import CameraLabPage from './pages/CameraLabPage'
import ArchivePage from './pages/ArchivePage'
import ExposureLabPage from './pages/ExposureLabPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="camera-lab" element={<CameraLabPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="exposure-lab" element={<ExposureLabPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App