import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })
 
    const registerUser = async (event) => {
        event.preventDefault();
        const {username, email, password } = data

        try {
            const{data} = await axios.post('http://localhost:3001/api/register', {
                username, email, password
            }) 
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Registration Successful')
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
    <div>
        <form onSubmit={registerUser}>
        <label>Username</label>
        <input type='text' placeholder='Username' value={data.username} onChange={(event) => setData({...data, username: event.target.value})} />

        <label>Email</label>
        <input type='email' placeholder='Email' value={data.email} onChange={(event) => setData({...data, email: event.target.value})} />

        <label>Password</label>
        <input type='password' placeholder='Password' value={data.password} onChange={(event) => setData({...data, password: event.target.value})} />

        <button type="submit">Submit</button>
        </form>


    </div>
  )

}