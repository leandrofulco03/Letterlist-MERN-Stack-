import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteList';
import CreateUser from './components/CreateUser';
import CreateNote from './components/CreateNote';
import HomePage from './pages/HomePage';
import NavBarBoost from './components/NavBar/NavBarBoost';
import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter>
      <NavBarBoost />
      <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/notelist' element={<NoteList />} />
      <Route path='/edit/:id' element={<CreateNote />} />
      <Route path='/create' element={<CreateNote />} />
      <Route path='/user' element={<CreateUser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
