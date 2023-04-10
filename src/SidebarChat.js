import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Avatar } from '@mui/material';

function SidebarChat() {

    const [seed, setSeed] = useState('');
 


    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))

    }, [])
  return (
    <div className='sidebarChat'>
        <Avatar  src={`https://api.dicebear.com/6.x/avataaars/svg?${seed}=Felix`}/>
        <div className="sidebarChat__info">
            <h2>Room name</h2>
            <p>Last message ...</p>
        </div>

    </div>
  )
}

export default SidebarChat