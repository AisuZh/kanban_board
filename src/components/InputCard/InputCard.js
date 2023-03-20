import React, { useContext, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';

import './InputCard.css';
import storeApi from '../../utils/storeApi';


const InputCard = ({ setOpen, listId, type }) => {
    const [title, setTitle] = useState('')
    const {addMoreCard, addMoreList} = useContext(storeApi)

    const handleSubmit = () => {
        if (type==='card'){
            addMoreCard(title, listId)
        }
        else{
            addMoreList(title)
        }
        setOpen(false)
        setTitle('')
    }

    const handleCloseButtonClick = () => {
        setOpen(false);
      };

    return (
        <div className='input-card'>
            <div className='input-card-container'>
                <textarea className='input-text'
                value={title}
                 placeholder={
                    type === 'card'
                        ? 'Enter a title of this card'
                        : 'Enter list title'
                }
                    autoFocus

                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className='confirm'>
                <button className='button_confirm' onClick={handleSubmit}>
                    {
                        type === 'card' ? 'Add card' : 'Add list'
                    }
                </button>
                <button className='button_cancel' onClick={handleCloseButtonClick}>
                    <ClearIcon className='icon_delete'/>
                </button>
            </div>
        </div>
    )
}

export default InputCard