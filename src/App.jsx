import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { store } from './store/store.js'



function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <main>
            <Routes>
              <Route path="/" element={<ToyIndex />} />
              <Route path="/home" element={<Home />} />
              <Route path="/toys" element={<ToyIndex />} />
              <Route path="/toys/:toyId" element={<ToyDetails />} />
              <Route path="/toys/edit" element={<ToyEdit />} />
              <Route path="/toys/edit/:toyId" element={<ToyEdit />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
    
  )
}

export default App
