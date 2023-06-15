import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'timeago.js';
import './NoteList.css';
import { Link } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollReveal from 'scrollreveal';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const getNotes = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/notes');
      setNotes(res.data);
      setIsEmpty(res.data.length === 0)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'left',
      distance: '80px',
      duration: 2000,
      reset: false
    });
    sr.reveal(
      `
      .notes_card_container
      `
    )
    getNotes();
  }, [])

  const deleteNote = async(id) => {
    try {
      await axios.delete('http://localhost:4000/api/notes/' + id)
      setIsEmpty(true)
      getNotes();
      toast(
        <div>
          <p>Note deleted❌</p>
        </div>
      )
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="note_list">
      <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mb-8">
          <h1 className="text-4x1 text-white sm:text-4xl font-bold text-center mt-32">Your Notes</h1>
        </div>
        <div className="notes_card_container flex flex-wrap justify-center items-center gap-4">
        {
           notes.length > 0 ? notes.map((note) => {
              return (
                    <div className="card" key={note._id}>
                    <h3 className="card__title">{note.title}</h3>
                    <p className="card__content">{note.content}</p>
                    <p className="card__author">{note.author}</p>
                    <div className="card__date">
                        {format(note.date)}
                    </div>
                    <div className="arrows">
                    <div className="card__arrow" onClick={() => deleteNote(note._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                            <TrashIcon />
                        </svg>
                    </div>
                    <div className="card__edit">
                    <Link to={'/edit/' + note._id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                             <PencilSquareIcon />
                        </svg>
                    </Link>
                    </div>
                    </div>
                    </div>
              )
            })
            :
            (
              <div className="border-l-4 rounded-lg border-red-500 text-red-500 p-4 mt-10" role="alert" style={{"backgroundColor": "#262751", "padding": "2rem"}}>
                <p className="font-bold">There are not any Note.</p>
                <p>You can create a Note if you want!</p>
              </div>
              )
        }
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        </div>
    </div>
  )
}
