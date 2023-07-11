import React, { useState } from 'react'
import {Avatar} from '@mui/material'
import { Switch } from '@mui/material'
import { motion } from 'framer-motion';
import ClearIcon from '@mui/icons-material/Clear';

export default function taskCard(task, index, dispatch) {
  const bgClass = task.complete ? 'bg-green-200' : 'bg-slate-50'
  const lineThroughClass = task.complete ? 'line-through' : ''

  
  const handleSwitchChange = (e) =>{
    const isOn = e.target.checked;
    console.log(isOn)
    dispatch({type:'toggle', payload:{index: index}})
  }
  
  return (
    <>
      <div className={`rounded-lg border px-4 py-2 ${bgClass}`}>
        <div className="flex items-center">
          <Avatar src="src/assets/stitch.jpg" sx={{ width: 24, height: 24 }} className='mr-2' />
          <div className='flex justify-between w-full'>
            <div className="flex flex-col text-start">
              <p className={`font-bold m-0 ${lineThroughClass}`}>{task.name}</p>              
              {task.complete && <small className='text-xs text-gray-500 m-0'>Completed at {task.completionDate}</small>} 
            </div>
            <div className="flex items-center">
              <Switch onChange={handleSwitchChange} checked={task.complete} />
              <ClearIcon className='text-red-500 cursor-pointer' onClick={()=> dispatch({type: 'delete', payload:{index: index}})} />
            </div>
          </div>         
        </div>
      </div>
    </>
  )
}
