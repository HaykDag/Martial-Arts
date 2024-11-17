import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup';
import HomePage from './pages/HomePage/HomePage';
import UploadWidget from './components/UploadWidget'
import NotFound from './pages/NotFound/NotFound';

const addTownUrl = 'http://localhost:8080/api/town/';
const addUserUrl = 'http://localhost:8080/api/user/'

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage />,
    errorElement:<NotFound />
  },
  {
    path:'/login',
    element:<Login />,
  },
  {
    path:'/signup',
    element:<Signup />
  },
])

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
