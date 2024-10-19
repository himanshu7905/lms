import React, { useState } from 'react'
// import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSuccessfulLogin = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('valid', true);
        navigate('/dashboard', { state: { userData } });
      };
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:2410/employee_login', values,{
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: false,})
        .then(result => {
            if(result.data.loginStatus) {
                console.log(result.data.userData)
                handleSuccessfulLogin(result.data.userData);
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 loginPage'>
    <div className='p-3 rounded w-50 w-md-70 border loginForm'>
        <div className='text-warning'>
            {error && error}
        </div>
        <h2 className='text-center'>Login User</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input
                    type="email"
                    name='email'
                    autoComplete='off'
                    placeholder='Enter Email'
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    className='form-control rounded-0'
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input
                    type="password"
                    name='password'
                    placeholder='Enter Password'
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    className='form-control rounded-0'
                />
            </div>
            <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
        </form>
    </div>
</div>
  )
}

export default EmployeeLogin