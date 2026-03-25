
import { useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
  }, [])


  return (
    <div className='flex flex-wrap content-between bg-gray-400'>
      <div className="w-full block">
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
