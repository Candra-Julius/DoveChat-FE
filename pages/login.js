import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '../public/component/input'
import styles from '../styles/login.module.css'
import axios from 'axios'
import { io } from 'socket.io-client'

const Login = ({setSocket}) => {
  const router = useRouter()
  const [login, setLogin] = useState({
    email:'',
    password:''
  })
  const fetchLogin = async(formData) => {
    const {data: result} = await axios.post(`${process.env.NEXT_API}/login`, formData)
    const data = result.data
    localStorage.setItem('token', data.token)
    const resSocket = io(process.env.NEXT_API, {
      query:{
        token: data.token
      }
    })
        setSocket(resSocket)
  }
  const handleChange = (e)=>{
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
    const handleLogin = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('email', login.email)
        formData.append('password', login.password)
        fetchLogin(formData)
        router.push('/')
    }
  return (
    <div className={styles.container}>
    <main className={styles.main}>
    <div className={styles.welcomeText}>
    <h3>Login</h3>
    <p>Hi, Welcome Back</p>
    </div>
    <form className={styles.form} onSubmit={handleLogin}>
    <Input type={'email'} placeholder={'Email'} label={'Email'} name={'email'} onChange={handleChange} required />
    <Input type={'password'} placeholder={'Password'} label={'Password'} name={'password'} onChange={handleChange} required />
    <p><Link href={'#'} className={styles.forgot}>Forgot password?</Link></p>
    <button type={'submit'} onClick={handleLogin}>Login</button>
    </form>
    <p className={styles.register}>Don’t have an account? <Link href={'/register'}>Sign Up </Link></p>
    </main>
    </div>
  )
}

export default Login