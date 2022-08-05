import { useEffect } from "react"
import {useRouter} from 'next/router'

const Loading = ({isLoggedIn}) => {
    const router = useRouter()
    useEffect(()=>{
        console.log(localStorage.getItem('token'));
        if(!localStorage.getItem('token')){
            setTimeout(()=>{router.reload()},3000)
            
        }else{
        setTimeout(()=>{
            router.push('/')
        }, 1000)
    }
    },[router])
  return (
    <div style={{width: '90vw', height: '90vh'}}>
    <h1 style={{margin: '50vh 50vw'}}>Loading</h1>
    </div>
  )
}

export default Loading