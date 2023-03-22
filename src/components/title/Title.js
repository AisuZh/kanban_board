import React, { useContext, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutsideClickHandler from 'react-outside-click-handler';

import storeApi from '../../utils/storeApi';
import './Title.css'

const Title = ({ title, listId }) => {
    const [open, setOpen] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const {updateListTitle, deleteList} = useContext(storeApi)

    const handleOnBlur = () => {
        updateListTitle(newTitle, listId)
        setOpen(!open)
    }
    return (
        <>
            { open ? (
                    <div>
                        <input type='text' 
                        className='input-title'
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onBlur={handleOnBlur}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleOnBlur()
                                }
                                return
                            }}
                            autoFocus
                        />
                    </div>
                ) : (
                    <div className='editable-title-container'>
                        <h2 onClick={() => setOpen(!open)} className='editable-title'>{title}</h2>
                        <button className='list-button' onClick={() => setOpenOptions(!openOptions)}>
                            <MoreVertIcon />
                        </button>
                        {
                            openOptions && (
                                <OutsideClickHandler onClickOut={(e) => {
                                    setOpenOptions(!openOptions)
                                }}>
                                    <ul className='menu-card'>
                                        <li onClick={() => {
                                           setOpenOptions(!openOptions)
                                            deleteList(listId)
                                        }}>
                                            Delete List</li>

                                        <li onClick={() => {
                                            setOpenOptions(!openOptions)
                                            setOpen(!open)
                                        }}>
                                            Edit Card Title</li>
                                    </ul>
                                </OutsideClickHandler>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default Title