import Favourites from './pages/Favourites/Favourites'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>404...Страница не найдена </div>} />
      </Routes>
    </>
  )
}

export default App
