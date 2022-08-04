import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../styles/chatList.module.css'
import dummy from '../../assets/No_image_available.svg.webp'
import Drawer from 'react-modern-drawer'
import { useState } from 'react'


const ChatList = ({href, img, name, previewe}) => {
  return (
    <div className={styles.container} key={href}>
    <Image src={img === null? dummy : img} width='68px' height='68px' layout='fixed' alt='profileImage' />
    <Link href={`/${href}`}>
    <div className={styles.text}>
    <h3>{name}</h3>
    <div className={styles.previewe}>
    <p>{previewe}</p>
    </div>
    </div>
    </Link>
    </div>
  )
}

export default ChatList