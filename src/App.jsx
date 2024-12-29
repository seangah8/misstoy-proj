import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import { ToyIndex } from './cmp/ToyIndex.jsx'

function App() {

  return (
    <Router>
      <section className="app main-layout">
        <main>
          <Routes>
            <Route path="/" element={<ToyIndex />} />
            <Route path="/toy-index" element={<ToyIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
