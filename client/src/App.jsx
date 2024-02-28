import './App.css'
import {Routes, Route} from 'react-router-dom'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import { HeroSection, Navbar } from './Components/componentsindex'

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {
 return (
  <UserContextProvider>
    <Navbar className="fixed-top" />  
    <Toaster position= 'bottom-right' toastOptions= {{duration: 2000}} />
    <Routes>
      <Route  path = '/' element={<Home />}  />
      <Route  path = '/register' element={<Register />}  />
      <Route  path = '/login' element={<Login />}  />
    </Routes>   
    </UserContextProvider>
    )
}

export default App
