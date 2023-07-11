import { useReducer, useState } from 'react'
import './App.css'
import taskCard from './components/taskCard/taskCard.jsx'
import { TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { motion, AnimatePresence } from "framer-motion"

//DOCU: Reducer function.
function handleTask(tasks, action){
  switch(action.type){
    case 'add':
      return [...tasks, {name:action.payload.name, complete:false, completionDate: null}];
    
    case 'toggle':
      tasks.map((task, index) =>{
        if(index === action.payload.index){
          task.complete = !task.complete;
          task.completionDate = getCurrentDate();
        }
      })

      return [...tasks];
    
    case 'delete':
      return tasks.filter((task, index) => index !== action.payload.index);

    default:
      return tasks;
  }
}

function getCurrentDate(){
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US');
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${formattedDate} ${formattedTime}`;
}

function App() {
  const [tasks, dispatch] = useReducer(handleTask, []);
  const [name, setName] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    dispatch({type:'add', payload:{name: name}});
    setName('');
  }

  return (
    <>
      <div className='prose prose-base mx-auto text-center max-w-7xl h-[90vh] flex items-center'>

        <div className='relative flex items-center flex-col w-[80vw] md:w-[50vw] lg:w-[40vw] h-[50vh] rounded-lg mx-auto shadow-lg bg-blue-100'>
          <div className="flex items-center">
            <BeenhereIcon className='text-blue-600' />
            <h2 className='my-2'>To-Do List</h2>          
          </div>

          <div className='overflow-y-auto h-[37vh] w-full'>
          <AnimatePresence>
            {tasks.map((task, index) =>{
              return (
                <motion.div
                key={index}
                className='mb-1 w-full'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                >
                  {taskCard(task, index, dispatch)}
                </motion.div>
              )
            })}
          </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className='absolute bottom-0 flex items-center w-full px-4 py-2'>            
            <TextField id="outlined-basic" type="text" value={name} onChange={(e)=> setName(e.target.value)} label="Add task" variant="outlined" className='w-full bg-white' />
            <AddCircleIcon className='text-green-500 cursor-pointer ' onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </>
  )
}

export default App
