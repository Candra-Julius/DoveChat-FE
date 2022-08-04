import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(()=>{
        setIsLoggedIn(localStorage.getItem('token'))
  }, [])

  useEffect(()=>{
    const token = localStorage.getItem('token')
      if(socket === null && token){
        const resSocket = io(process.env.NEXT_API, {query:{token: token}})
        setSocket(resSocket)
      }
  }, [socket])
  return <Component {...pageProps} setSocket={setSocket} socket={socket} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
}

export default MyApp
