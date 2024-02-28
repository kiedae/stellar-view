import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    
    const loginUser = async (event) => {
        event.preventDefault();
        const {email, password} = data
        
        try {
            const {data} = await axios.post('http://localhost:3001/api/login', {
                email,
                password
            });
            if(data.error){
                toast.error(data.error)
            } else {
                setData({});
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
    <div>
        <form onSubmit={loginUser}>
        <label>Email</label>
        <input type='email' placeholder='Email' value={data.email} onChange={(event) => setData({...data, email: event.target.value})} />

        <label>Password</label>
        <input type='password' placeholder='Password' value={data.password} onChange={(event) => setData({...data, password: event.target.value})} />

        <button type="submit">Login</button>
        </form>


    </div>
  )
}
