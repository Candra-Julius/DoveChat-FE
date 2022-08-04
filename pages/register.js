import Input from '../public/component/input'
import styles from '../styles/register.module.css'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [error, setError] = useState('')
  const [response, setResponse] = useState('')
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: ''
    })
    const fetchRegister = async(formData) => {
      try {
        const {data: result} = await axios.post(`${process.env.NEXT_API}/register`, formData)
      const data = result
      console.log(data);
      setResponse(data.message)
      } catch (error) {
        console.log(error);
        setError(error.response.data.message)
      }
      
    }
    const handleChange = (e) => {
      setRegister({
        ...register,
        [e.target.name]: e.target.value
      })
    }
    const handleRegister = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('fullname', register.name)
      formData.append('email', register.email)
      formData.append('password', register.password)
      fetchRegister(formData)
    }
  return (
    <div className={styles.container}>
    <main className={styles.main}>
    <h1><Link href={'/login'}>{'<'}</Link></h1>
    <div className={styles.welcomeText}>
    <h3>Register</h3>
    <p>Hi, Nice to meet you</p>
    {response? <p className={styles.colBlack}>{response}</p>: <p className={styles.colRed}>{error}</p>}
    </div>
    <form className={styles.form} onSubmit={handleRegister}>
    <Input name={'name'} label={'Name'} type='text' onChange={handleChange} />
    <Input name={'email'} label={'Email'} type={'email'} onChange={handleChange} />
    <Input name={'password'} label={'Password'} type={'password'} onChange={handleChange} />
    <button type='submit' onClick={handleRegister}>Register</button>
    </form>
    </main>
    </div>
  )
}

export default Register