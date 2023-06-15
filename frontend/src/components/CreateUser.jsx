import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateUser.css';

export default function CeateUser() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/users');
            setUsers(res.data);
            setIsEmpty(res.data.length === 0);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const onChangeUsername = (e) => {
        try {
            setUsername(e.target.value)
        } catch (error) {
            console.log(error);            
        }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/users', {
                username: username
            })
            setUsername('');
            setIsEmpty(true);
            getUsers();
            toast(
              <div>
                <p>User created succesfully✅  </p>
              </div>
            )
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/users/${id}`);
            getUsers();
            toast(
              <div>
                <p>User deleted❌ </p>
              </div>
            )
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className='user_container_fluid'>
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
      <div className='user_container'>
      <div className="user_form_left">
          <div className="user_card">
              <h3 className='text-3x1 mb-10 font-bold tracking-tight text-white sm:text-5xl'>Create New User</h3>
              <form onSubmit={onSubmit} className='form_group'>
                <div>
                    <input type="text" className='form_control' value={username} onChange={onChangeUsername} />
                </div>
                <button type='submit' style={{'background-image': 'linear-gradient(30deg, #bc312e, #e23e3c)'}} className='btn_primary'>Save</button>
              </form>
          </div>
      </div>
      <div className="user_form_right">
        <h4 className='text-white'>User List</h4>
        <ul role='list' className="divide-y divide-gray-100">
            {
              users.length > 0 ? (users.map((user) => {
                    return(
                      <li key={user._id} className="user_list flex items-center justify-between gap-x-6 py-5 sm:w-96">
                      <div className="flex items-center gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-lg font-semibold leading-6 text-white">{user.username}</p>
                          </div>
                      </div>
                      <div className="sm:flex sm:flex-col sm:items-end">
                      <button className='btn_primary' onClick={() => deleteUser(user._id)}>Delete</button>
                      </div>
                    </li>
                    )
                }))
                : 
                (
                <div className="border-l-4 rounded-lg border-red-500 text-red-500 p-4 mt-10" role="alert" style={{"backgroundColor": "#262751", "padding": "2rem"}}>
                  <p className="font-bold">Not Users yet.</p>
                  <p>Save a User!</p>
                </div>
                )
            }
        </ul>
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
    </section>
  )
}
