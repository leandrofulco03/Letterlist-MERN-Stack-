import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateNote.css';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateNote() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [editing, setEditing] = useState(false);
  const [_id, set_id] = useState('');
  const { id } = useParams();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const getUsers = async() => {
    try {
      const res = await axios.get('http://localhost:4000/api/users');
      setUsers(res.data.map(user => user.username));
      setUserSelected(res.data[0].username);
    } catch (error) {
      console.log(error);
    }
  }

  const getNote = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/notes/${id}`);
      const note = res.data;
      setTitle(note.title);
      setContent(note.content);
      setDate(new Date(note.date));
      setUserSelected(note.author);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
    if (id) {
      setEditing(true);
      set_id(id);
      getNote(id);
    }
  }, [id])

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      const newNote = {
        title: title,
        content: content,
        date: date,
        author: userSelected
      }
      if (editing) {
        await axios.put('http://localhost:4000/api/notes/' + _id, newNote);
      } else {
        await axios.post('http://localhost:4000/api/notes', newNote);    
      }
      toast(
        <div>
          <p className='flex flex-col'>
            Note Saved. 
            <Link to={'/notelist'}> Click here to go to 
            <span style={{"color": "#bc312e", "fontWeight": "bold"}} > Note List👈 </span>
            </Link>
          </p>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    try {
      if (name === 'title') {
        setTitle(value);
      } else if (name === 'content') {
        setContent(value);
      } else if (name === 'userSelected') {
        setUserSelected(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeDate = (selectedDate) => {
    setDate(selectedDate)
  }

    return (
      <section className='note_container_fluid'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
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
          <div className="pt-18">
          <div className='note_card'>
            <Listbox value={userSelected} onChange={setUserSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-white pt-6">Assigned to</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" style={{'padding': '.5rem'}}>
              <span className="flex items-center">
                  {
                    users.map((user) => {
                    if (user === userSelected) {
                     return <span className="ml-3 block truncate" value={user} key={user._id}>
                        {user}
                      </span>
                    } else {
                      return null;
                    }
                  })
                  }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {users.map((user) => (
                  <Listbox.Option
                    key={user._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={user}
                    name='userSelected'
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {user}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>

    <div className='pt-4'>
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
        Title
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="title"
          id="title"
          onChange={onInputChange}
          required
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Study"
        />
      </div>
    </div>

    <div className='pt-4'>
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
        Content
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <textarea 
        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        name='content'
        placeholder='Make a resume for the exam'
        onChange={onInputChange}
        required
        >
        </textarea>
      </div>
    </div>
    <div className='pt-4'>
       <DatePicker 
        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        selected={date}
        onChange={onChangeDate}
       />     
    </div>
            <form onSubmit={onSubmit} className='pt-3'>
                <button type='submit' style={{'background-image': 'linear-gradient(30deg, #bc312e, #e23e3c)'}} className='btn_primary'>Save</button>
            </form>
            </div>
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
      </section>
    )
  }

