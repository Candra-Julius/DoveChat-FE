/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import styles from '../styles/chatID.module.css'
import io from 'socket.io-client'
import Image from 'next/image'
import dummy from '../public/assets/No_image_available.svg.webp'
import { useRouter } from 'next/router'
import ConversationBar from '../public/component/ConversationBar/index'
import axios from 'axios'
import moment from 'moment'
moment.locale('id')

const ChatBox = ({socket, data, id}) => {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [newMessage, setNewMessage] = useState([])
    useEffect(()=>{
      if(socket !== null){
          socket.off('message')
          socket.on('message', (message)=>{
            setNewMessage((current)=>[...current, message])
            console.log(newMessage);
        })
      } 
      }, [socket, newMessage])
      const fetchData = async(reciver) =>{
        const token = localStorage.getItem('token')
        const {data} = await axios.get(`${process.env.NEXT_API}/chat/getchat/${reciver.user_id}`, {headers: {
          Authorization: `Bearer ${token}`}})
        const result = data.data
        console.log(result);
        setNewMessage(result)
      }
      useEffect(()=>{
        fetchData(data)
      },[data])
    const handleChange = (e) =>{
        setMessage(e.target.value)
      }
      const handleSend = (e) => {
        e.preventDefault()
        if(message){
          const dates = new Date()
          socket.emit('message', {
            idReciver: data.user_id,
            messageBody: message,
            date: dates
          }, (message)=>{
            setNewMessage((current)=>[...current, message])
          })
        
        }
        setMessage('')
      }
  return (
    <main className={styles.container}>
    <ConversationBar/>
    <div className={styles.sect2}>
    <div className={styles.reciver}>
    <Image alt='' src={dummy} width='65px' height='65px' />
    <div className={styles.status} >
    <h4>{data.fullname}</h4>
    <p>online</p>
    </div>
    </div>
    <div className={styles.message}>
    {newMessage.map((datas)=>(
      <ul>
        <li className={datas.reciver !== data.user_id? styles.list: styles.lists }><h4>{datas.message}</h4> <p>{datas.date}</p></li>
      </ul>
      
    ))}
    </div>
    <form className={styles.form} onSubmit={handleSend}>
    <input type={'text'} className={styles.inputMess} value={message} onChange={handleChange}/>
    </form>
    </div>
    </main>
  )
}
export const getServerSideProps = async(context) => {
  try {
      const {id} = context.params
      const {data} = await axios.get(`${process.env.NEXT_API}/chat/getReciver/${id}`)
      const [result] = data.data
      return{
          props:{data: result, id}
      }
  } catch (error) {
    console.log(error);
  }
}
export default ChatBox