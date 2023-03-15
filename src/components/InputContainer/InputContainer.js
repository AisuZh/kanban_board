import React, {useState} from 'react'
import Collapse from '@mui/material/Collapse';

import './inputContainer.css';
import InputCard from '../InputCard/InputCard';

const InputContainer = ({listId, type}) => {
    const [open, setOpen] = useState(false)

  return (
    <div className='input-container'>
        <Collapse in={open}>
            <InputCard setOpen={setOpen} listId={listId} type={type}/>
        </Collapse>
        <Collapse in={!open}>
        </Collapse>
        <div className='input-content'>
            <button className='input_btn' onClick={()=>setOpen((prev)=>!prev)}>
                {
                    type==='card'? "+ Add card" : '+ Add list'
                }
            </button>
        </div>
    </div>
  )
}

export default InputContainer