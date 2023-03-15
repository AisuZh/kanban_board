import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid'
import { doc, updateDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { arrayUnion, query, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
 
import InputContainer from '../InputContainer/InputContainer';
import List from '../list/List';
import './board.css';
import {db, timestamp} from '../../firebase'
import storeApi from '../../utils/storeApi';


const Board = () => {
  const [lists, setLists] = useState([])

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])

  useEffect(()=>{
    const q = query(collection(db, 'lists'), orderBy('timestamp', 'asc'))
    onSnapshot(q,(snapShot)=>{
      setLists(snapShot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data()
        }
      }))

    })
  },[])

  const addMoreCard = async (title, listId) => {
    if (!title){
      return
    }

    const newCardId = uuid()
    const newCard = {
      id: newCardId,
      title,
    }

    const listRef = doc(db, 'lists', listId)

    await updateDoc(listRef, {
      cards: arrayUnion(newCard),
    })
  }


  const removeCard = (index, listId, cardId) => {
    const listRef = doc (db, 'lists', listId)

    lists.forEach(async(list)=>{
      if (list.id===listId) {
        list.cards.splice(index, 1)
        await updateDoc (listRef, {
          cards: list.cards.filter(card=>cardId.id!==cardId)
        })
      }
      return list
    })
  }

  const updateCardTitle = (title, index, listId, cardId) => {
    const listRef = doc(db, 'lists', listId)

    lists.forEach(async(list)=>{
      if(list.id===listId){
        list.cards[index].title=title;
        await updateDoc (listRef, {
          cards: list.cards.map((card)=>{
            if (card.id===cardId){
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
  
    await addDoc(collection(db, 'lists'), {
      title,
      cards: [],
      timestamp
    })
  }

  const updateListTitle = (title, listId) => {
    const listRef = doc(db, 'lists', listId)

    lists.forEach(async(list)=> {
      if(list.id===listId){
        list.title = title
        await updateDoc (listRef, {
          title: title
        })
      }
      return list
    })
  }

  const deleteList = async (listId) => {
    const listRef = doc(db, 'lists', listId);
    await deleteDoc(listRef);
  };

  const onDragEnd = async(result)=> {
    const {destination, source, draggableId, type} = result;

    if (!destination){
      return
    }

    if(type==='list'){
      const destinationRef = doc(db, 'lists', lists[destination.index].id)
      const sourceRef = doc (db, 'lists', lists[source.index].id)

      await updateDoc (destinationRef, {
        timestamp: lists[source.index].timestamp
      })

      await updateDoc (sourceRef, {
        timestamp: lists[destination.index].timestamp
      })
      return
    }

    if(source.droppableId === destination.droppableId){
      const list = lists.find((list)=>list.id===source.droppableId)

      const updatedCards =list.cards.map((card, index)=> {
        if (index===source.index){
          return list.cards[destination.index]
        }
        if(index===destination.index){
          return list.cards[source.index]
        }
        return card
      })
      const listRef = doc (db, 'lists', destination.droppableId)
      await updateDoc (listRef, {
        cards: updatedCards
      })
    }
    else{
      const sourceList = lists.find((list)=>list.id===source.droppableId)
      const destinationList = lists.find((list)=>list.id===destination.droppableId)
      const draggingCard = sourceList.cards.filter((card)=>card.id===draggableId) [0]

      const sourceListRef = doc (db, 'lists', source.droppableId)
      sourceList.cards.splice(source.index, 1)

      await updateDoc(sourceListRef, {
        cards: sourceList.cards
      })

      const destinationListRef = doc (db, 'lists', destination.droppableId)
      destinationList.cards.splice(destination.index,0,draggingCard)

      await updateDoc(destinationListRef, {
        cards: destinationList.cards
      })
    }
  }

    return (
    <storeApi.Provider
    value={
      {
        addMoreCard,
        addMoreList,
        updateCardTitle,
        removeCard,
        updateListTitle,
        deleteList
      }
    }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='app' direction='horizontal' type='list'>
          {
            (provided) => (
              <div className='wrapper'
              ref={provided.innerRef}>
                {
                  lists.map((list, index) => (
                    <List list={list} key={list.id} index={index}/>
                    ))
                }
                <div>
                  <InputContainer type='list'/>
                </div>
              {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </storeApi.Provider>
  )
}

export default Board