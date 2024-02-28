import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const registerUser = async (event) => {
    event.preventDefault();
    const { username, email, password } = data;

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success('Registration Successful');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={registerUser}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={data.username}
              onChange={(event) =>
                setData({ ...data, username: event.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(event) =>
                setData({ ...data, password: event.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}






// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// export default function Register() {
//     const navigate = useNavigate()
//     const [data, setData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     })
 
//     const registerUser = async (event) => {
//         event.preventDefault();
//         const {username, email, password } = data

//         try {
//             const{data} = await axios.post('http://localhost:3001/api/register', {
//                 username, email, password
//             }) 
//             if(data.error) {
//                 toast.error(data.error)
//             } else {
//                 setData({})
//                 toast.success('Registration Successful')
//                 navigate('/login')
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
  
//     return (
//     <div>
//         <form onSubmit={registerUser}>
//         <label>Username</label>
//         <input type='text' placeholder='Username' value={data.username} onChange={(event) => setData({...data, username: event.target.value})} />

//         <label>Email</label>
//         <input type='email' placeholder='Email' value={data.email} onChange={(event) => setData({...data, email: event.target.value})} />

//         <label>Password</label>
//         <input type='password' placeholder='Password' value={data.password} onChange={(event) => setData({...data, password: event.target.value})} />

//         <button type="submit">Submit</button>
//         </form>


//     </div>
//   )

// }
