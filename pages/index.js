import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ConversationBar from '../public/component/ConversationBar/index'
import styles from '../styles/index.module.css'
import withAuth from '../public/component/HOC/withAuth/withAuth'

const Index = () => {
  const router = useRouter()
  // const router = useRouter()
  // useEffect(()=>{
  //   if (typeof window !== 'undefined') {
  //     if(!localStorage.getItem('token')){
  //       router.replace('/login')
  //     }
  //   }
  // }, [])
  // useEffect(()=>{
  //     if(!localStorage.getItem('token')){
  //       router.replace('/login')
  //     }
  // }, [])
  return (
    <div className={styles.container}>
    <ConversationBar/>
    <p className={styles.start}>
    Start Your Conversation
    </p>
    </div>
  )
}

export default withAuth(Index)