/* eslint-disable react/jsx-key */
import option from '../../assets/4bar option.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import dummy from '../../assets/No_image_available.svg.webp'
import ChatList from '../ChatList/index'
import axios from 'axios'

export default function Home({socket,setSocket}) {
  const [mySelf, setMySelf] = useState({})
  const [selectedFile, setSelectedFile] = useState([])
  const [previewe, setPreviewe] = useState([])
  const [update, setUpdate] = useState({
    fullname: '',
    username: '',
    description: ''
  })
  const [friend, setFriend] = useState([])
  const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem('token')
      if(socket === null && token){
        const resSocket = io(process.env.NEXT_API)
        setSocket(resSocket.data)
      }
  }, [])
  const myIdentity = async () => {
    const token = localStorage.getItem('token')
    const {data} = await axios({
      method: 'GET',
      baseURL:`${process.env.NEXT_API}`,
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(data.data[0])
    setPreviewe(data.data[0].avatar)
    setMySelf(data.data[0])
  }
  const insertData = async (formData) => {
    const  token = localStorage.getItem('token')
    await axios({
      method: 'PUT',
      baseURL: `${process.env.NEXT_API}`,
      url: '/user/update',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  const handleAva = (e) => {
    setSelectedFile(e.target.files[0])
    setPreviewe(URL.createObjectURL(e.target.files[0]))
  }
  useEffect(()=>{
    console.log(update);
    console.log(`previewe ${previewe}`);
    console.log(mySelf);
    console.log(dummy);
  }, [update, previewe, mySelf])
  useEffect(()=>{
    myIdentity()
  }, [])
  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(`${process.env.NEXT_API}/user`, {headers: {
      Authorization: `Bearer ${token}`
        }})
    .then((res)=>{
      const user = res.data.data
      setFriend(user)
    })
  }, [])
  const handleChange = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('fullname', update.fullname || mySelf.fullname)
    formData.append('username', update.username || mySelf.usersname)
    formData.append('description', update.description || mySelf.description)
    formData.append('avatar', selectedFile)
    await insertData(formData)
    router.reload()
  }
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    router.push('/login')
  }
  const showProfile = () =>{
    if(document.getElementById("show").style.display === "none"){
      document.getElementById("show").style.display = "flex";
    }else{
      document.getElementById("show").style.display = "none";
    }
  }
  return (
    <div className={styles.container}>
    <div className={styles.friendList} >
    <div className={styles.title}>
    <h3>DoveChat</h3>
    <div id={styles.imgOption} >
    <Image src={option} alt={'option'} onClick={()=>showProfile()}/>
    <div className={styles.option} id={'show'}>
      <div className={styles.identity}>
        <div className={styles.selfPortrait}>
        <label htmlFor='ava'>
          {!mySelf.avatar?  <Image className={styles.avatar} src={dummy} alt={'profileImage'}/> : <Image className={styles.avatar} src={mySelf.avatar} alt={'image'} width={'100%'} height={'100%'} layout='responsive'/>}
        </label>
          <input id='ava' className={styles.uploadAva} type={'file'} onChange={(e)=>handleAva(e)} />
        </div>
        <input type={'text'} name={'fullname'} placeholder={mySelf&& mySelf.fullname} onChange={handleChange} className={styles.fullname}/>
        <p>@{mySelf? mySelf.usersname : 'usersname'}</p>
      </div>
      <div className={styles.line}/>
      <div className={styles.account}>
        <h3>Account</h3>
        <input type={'email'} value={update.email} name={'email'} placeholder={mySelf&& mySelf.email} onChange={handleChange} />
      </div>
      <div className={styles.line}/>
      <div className={styles.username}>
        <input type={'input'} name={'username'} value={update.username} placeholder={mySelf&& mySelf.usersname} onChange={handleChange}/>
        <p>Username</p>
      </div>
      <div className={styles.line}/>
      <div className={styles.bio}>
        <input type={'text'} name={'description'} value={update.description} placeholder={mySelf&& mySelf.description} onChange={handleChange}/>
        <p>Bio</p>
      </div>
      <div style={{display: 'flex', 'justifyContent': 'space-between'}}>
        <button className={styles.logout} type={'button'} onClick={handleLogout}>{'Logout'}</button>
        <button className={styles.button} type={'submit'} onClick={handleSubmit}>Save</button>
      </div>
    </div>
    </div>
    </div>
    <div className={styles.searchBar} >
    <input type={'search'} placeholder={'Type your message...'}/>
    <div>
    <button className={styles.plus}>+</button>
    </div>
    </div>
    {friend.map((data)=>(
      <ChatList name={data.fullname} img={data.avatar} href={data.user_id} />
    ))}
      
    </div>
    </div>
  )
}
