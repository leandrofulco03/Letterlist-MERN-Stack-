import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteList';
import CreateUser from './components/CreateUser';
import CreateNote from './components/CreateNote';
import HomePage from './pages/HomePage';
import NavBarBoost from './components/NavBar/NavBarBoost';
import Footer from './components/Footer';
import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

function App() {

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: false
    });
    sr.reveal(
      `
      .home_container,
      .footer,
      .user_container_fluid,
      `
    )
  }, [])

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
