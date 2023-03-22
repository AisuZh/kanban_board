import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid'
import { doc, updateDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { arrayUnion, query, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

import InputContainer from '../InputContainer/InputContainer';
import List from '../list/List';
import './board.css';
import { db, timestamp } from '../../firebase'
import storeApi from '../../utils/storeApi';
import { auth } from '../../firebase';

const Board = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, `users/${uid}/lists`), orderBy('timestamp', 'asc'))
        onSnapshot(q, (snapShot) => {
          setLists(snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }))
        })
      } else {

        console.log("user is logged out")
      }
    });
  }, [])
  console.log(lists)


  const addMoreCard = async (title, listId, modal) => {
    if (!title) {
      return
    }

    const newCardId = uuid()
    const newCard = {
      id: newCardId,
      title,
      modal: {
        description: '',
        deadline: 0
      }
    }

    const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, listId)

    await updateDoc(listRef, {
      cards: arrayUnion(newCard),
    })
  }


  const removeCard = (index, listId, cardId) => {
    const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, listId)

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards.splice(index, 1)
        await updateDoc(listRef, {
          cards: list.cards.filter(card => card.id !== cardId)
        })
      }
      return list
    })
  }

  const updateCardTitle = (title, index, listId, cardId) => {
    const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, listId)

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards[index].title = title;
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              card.title = title;
              return card
            }
            return card
          })
        })
      }
      return list
    })
  }

  const addMoreList = async (title) => {
    if (!title) {
      return
    }

    await addDoc(collection(db, `users/${auth.currentUser.uid}/lists`), {
      title,
      cards: [],
      timestamp
    })
  }

  const updateListTitle = (title, listId) => {
    const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, listId)

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.title = title
        await updateDoc(listRef, {
          title: title
        })
      }
      return list
    })
  }

  const deleteList = async (listId) => {
    const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, listId)
    await deleteDoc(listRef)
  }

  const onDragEnd = async (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'list') {
      const newListOrder = Array.from(lists);
      const [removed] = newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, removed);

      for (let index = 0; index < newListOrder.length; index++) {
        const list = newListOrder[index];
        const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, list.id);
        await updateDoc(listRef, {
          position: index,
        });
      }

      setLists(newListOrder);
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find((list) => list.id === destination.droppableId);

      if (sourceList === destinationList) {
        const newCardOrder = Array.from(sourceList.cards);
        const [removed] = newCardOrder.splice(source.index, 1);
        newCardOrder.splice(destination.index, 0, removed);

        const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, sourceList.id);
        await updateDoc(listRef, {
          cards: newCardOrder,
        });

        sourceList.cards = newCardOrder;
      } else {
        const sourceCardOrder = Array.from(sourceList.cards);
        const [removed] = sourceCardOrder.splice(source.index, 1);
        const destinationCardOrder = Array.from(destinationList.cards);
        destinationCardOrder.splice(destination.index, 0, removed);

        const sourceListRef = doc(db, `users/${auth.currentUser.uid}/lists`, sourceList.id);
        const destinationListRef = doc(db, `users/${auth.currentUser.uid}/lists`, destinationList.id);

        await Promise.all([
          updateDoc(sourceListRef, {
            cards: sourceCardOrder,
          }),
          updateDoc(destinationListRef, {
            cards: destinationCardOrder,
          }),
        ]);

        sourceList.cards = sourceCardOrder;
        destinationList.cards = destinationCardOrder;
      }
      const newListOrder = [...lists];
      const sourceListIndex = newListOrder.findIndex((list) => list.id === sourceList.id);
      const destinationListIndex = newListOrder.findIndex((list) => list.id === destinationList.id);
      newListOrder[sourceListIndex] = sourceList;
      newListOrder[destinationListIndex] = destinationList;
      setLists(newListOrder);
    }
  }

  return (
    <div className='board'>
      <div className="container">
        <storeApi.Provider value={{ addMoreCard, removeCard, updateCardTitle, addMoreList, updateListTitle, deleteList }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app" direction="horizontal" type="list">
              {provided => (
                <div className="wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                  {lists.map((list, index) => (
                    <List list={list} key={list.id} index={list.position} />
                  ))}
                  {provided.placeholder}
                  <InputContainer type="list" onAdd={addMoreList} />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </storeApi.Provider>
      </div>
    </div>
  )
}

export default Board;










