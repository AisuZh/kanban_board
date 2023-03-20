// import React, { useContext, useState } from 'react'
// import { Draggable } from "react-beautiful-dnd";
// import TextareaAutosize from 'react-textarea-autosize'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// import './Card.css';
// import storeApi from '../../utils/storeApi';

// const Card = ({ card, listId, index }) => {
//     const [open, setOpen] = useState(false)
//     const [newTitle, setNewTitle] = useState(card.title)
//     const { removeCard, updateCardTitle } = useContext(storeApi)

//     const handleOnBlur = () => {
//         updateCardTitle(index, listId, newTitle)
//         setOpen(!open)
//     }

//     return (
//         <Draggable draggableId={card.id} index={index}>
//             {
//                 (provided) => (
//                     <div
//                         ref={provided.innerRef}
//                         {...provided.dragHandleProps}
//                         {...provided.draggableProps}
//                     >
//                         <div className='card-content'>
//                             {open ? (
//                                 <TextareaAutosize
//                                     type='text'
//                                     className='input-card-title'
//                                     value={newTitle}
//                                     onChange={(e) => setNewTitle(e.target.value)}
//                                     onKeyPress={(e) => {
//                                         if (e.key === 'Enter') {
//                                             handleOnBlur(card.id)
//                                         }
//                                         return
//                                     }}
//                                     onBlur={handleOnBlur}
//                                     autoFocus
//                                 />
//                             ) : (
//                                 <div onClick={() => setOpen((prev) => !prev)}
//                                     className='card-title-container'>
//                                     <p className='card-title'>{card.title}</p>
//                                     <button
//                                         onClick={() => {
//                                             removeCard(index, listId, card.id);
//                                         }} className='card_svg'
//                                     ><DeleteOutlineIcon className='card_svg' /></button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )
//             }
//         </Draggable>
//     )
// }

// export default Card



import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { Draggable } from "react-beautiful-dnd";
import TextareaAutosize from 'react-textarea-autosize'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DatePicker from "react-datepicker";
import TaskIcon from '@mui/icons-material/Task';
import CancelIcon from '@mui/icons-material/Cancel';
import "react-datepicker/dist/react-datepicker.css";
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Card.css';
import storeApi from '../../utils/storeApi';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '50%',
        overflow: 'auto',
        borderRadius: '5px',
        outline: 'none',
        padding: '20px',
    }
};

const Card = ({ card, listId, index, savedDate }) => {
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState(card.title)
    const { removeCard, updateCardTitle } = useContext(storeApi)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(savedDate ? new Date(savedDate.replace(/-/g, '/')) : new Date());  
      const [modalText, setModalText] = useState('');

    const submitModal = async () => {
        const listRef = doc(db, `users/${auth.currentUser.uid}/lists/${listId}`);
        const listSnapshot = await getDoc(listRef);
        const cardsArray = listSnapshot.data().cards;

        const matchingCard = cardsArray.find((c) => c.id === card.id);

        if (!matchingCard) {
            console.error(`No card found with id ${card.id}`);
            return;
        }

        const cardIndex = cardsArray.indexOf(matchingCard);
        const updatedCard = {
            ...matchingCard,
            modal: {
                description: modalText.toString(),
                deadline: startDate.toDateString()
            }

        };
        const updatedCardsArray = [
            ...cardsArray.slice(0, cardIndex),
            updatedCard,
            ...cardsArray.slice(cardIndex + 1)
        ];
        console.log(cardsArray)
        await updateDoc(listRef, { cards: updatedCardsArray });
        setIsOpen(false);
        console.log(startDate)
    };

    const handleOnBlur = () => {
        updateCardTitle(index, listId, newTitle)
        setOpen(!open)
    }

    const openModal = async () => {
        setIsOpen(true);
    }

    const closeModal = async () => {
        setIsOpen(false);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {
                (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                    >
                        <div className='card-content'>
                            {open ? (
                                <TextareaAutosize
                                    type='text'
                                    className='input-card-title'
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleOnBlur(card.id)
                                        }
                                        return
                                    }}
                                    onBlur={handleOnBlur}
                                    autoFocus
                                />
                            ) : (
                                <div onClick={() => setOpen((prev) => !prev)}
                                    className='card-title-container'>
                                    <p className='card-title'>{card.title}</p>
                                    <button
                                        onClick={() => {
                                            removeCard(index, listId, card.id);
                                        }} className='card_svg'
                                    ><DeleteOutlineIcon className='card_svg' /></button>
                                </div>
                            )}

                            <button className='modal-open' onClick={openModal}>+</button>

                            <Modal
                                className='modal'
                                style={customStyles}
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                            >
                                <TaskIcon className='task_icon' />
                                <h2 className='modal_title'>{card.title}</h2>
                                <p className='modal_descr'>Add description</p>
                                <div className='wrap'>
                                    <div className='descr_wrapper'>
                                        <TextareaAutosize
                                            placeholder='Type...'
                                            className='descr_input'
                                            value={modalText || card.modal.description}
                                            onChange={(e) => setModalText(e.target.value)}
                                        />
                                        <button className='descr_save' onClick={submitModal}>Save</button>
                                    </div>
                                    <div>
                                        <p className='modal_deadline'>Dates:</p>
                                        <p className='picked_date'>{card.modal.deadline}</p>

                                        <DatePicker
                                            className='modal_date'
                                            selected={startDate}
                                            onChange={(deadline) => setStartDate(deadline)}
                                        />
                                    </div>
                                </div>
                                <button className='modal_close' onClick={closeModal}><CancelIcon /></button>
                            </Modal>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default Card;


