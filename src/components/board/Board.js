// import React, { useEffect, useState } from 'react'
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import { v4 as uuid } from 'uuid'
// import { doc, updateDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
// import { arrayUnion, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { onAuthStateChanged } from "firebase/auth";

// import InputContainer from '../InputContainer/InputContainer';
// import List from '../list/List';
// import './board.css';
// import { db, timestamp } from '../../firebase'
// import storeApi from '../../utils/storeApi';
// import { auth } from '../../firebase';



// const Board = () => {
//   const [lists, setLists] = useState([])

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         console.log("uid", uid)
//       } else {
//         console.log("user is logged out")
//       }
//     });

//   }, [])

//   useEffect(() => {
//     const q = query(collection(db, 'lists'), orderBy('timestamp', 'asc'))

//     onSnapshot(q, (snapShot) => {
//       setLists(snapShot.docs.map((doc) => {
//         return {
//           id: doc.id,
//           ...doc.data()
//         }
//       }))
//     })

//   }, [])

//   const addMoreCard = async (title, listId) => {
//     if (!title) {
//       return
//     }

//     const newCardId = uuid()
//     const newCard = {
//       id: newCardId,
//       title,
//     }

//     const listRef = doc(db, 'lists', listId)

//     await updateDoc(listRef, {
//       cards: arrayUnion(newCard),
//     })
//   }


//   const removeCard = (index, listId, cardId) => {
//     const listRef = doc(db, 'lists', listId)

//     lists.forEach(async (list) => {
//       if (list.id === listId) {
//         list.cards.splice(index, 1)
//         await updateDoc(listRef, {
//           cards: list.cards.filter(card => cardId.id !== cardId)
//         })
//       }
//       return list
//     })
//   }

//   const updateCardTitle = (title, index, listId, cardId) => {
//     const listRef = doc(db, 'lists', listId)

//     lists.forEach(async (list) => {
//       if (list.id === listId) {
//         list.cards[index].title = title;
//         await updateDoc(listRef, {
//           cards: list.cards.map((card) => {
//             if (card.id === cardId) {
//               card.title = title;
//               return card
//             }
//             return card
//           })
//         })
//       }
//       return list
//     })
//   }

//   const addMoreList = async (title) => {
//     if (!title) {
//       return
//     }

//     await addDoc(collection(db, 'lists'), {
//       title,
//       cards: [],
//       timestamp
//     })
//   }

//   const updateListTitle = (title, listId) => {
//     const listRef = doc(db, 'lists', listId)

//     lists.forEach(async (list) => {
//       if (list.id === listId) {
//         list.title = title
//         await updateDoc(listRef, {
//           title: title
//         })
//       }
//       return list
//     })
//   }

//   const deleteList = async (listId) => {
//     const listRef = doc(db, 'lists', listId);
//     await deleteDoc(listRef);
//   };

//   const onDragEnd = async (result) => {
//     const { destination, source, draggableId, type } = result;

//     if (!destination) {
//       return
//     }

//     if (type === 'list') {
//       const destinationRef = doc(db, 'lists', lists[destination.index].id)
//       const sourceRef = doc(db, 'lists', lists[source.index].id)

//       await updateDoc(destinationRef, {
//         timestamp: lists[source.index].timestamp
//       })

//       await updateDoc(sourceRef, {
//         timestamp: lists[destination.index].timestamp
//       })
//       return
//     }

//     if (source.droppableId === destination.droppableId) {
//       const list = lists.find((list) => list.id === source.droppableId)

//       const updatedCards = list.cards.map((card, index) => {
//         if (index === source.index) {
//           return list.cards[destination.index]
//         }
//         if (index === destination.index) {
//           return list.cards[source.index]
//         }
//         return card
//       })
//       const listRef = doc(db, 'lists', destination.droppableId)
//       await updateDoc(listRef, {
//         cards: updatedCards
//       })
//     }
//     else {
//       const sourceList = lists.find((list) => list.id === source.droppableId)
//       const destinationList = lists.find((list) => list.id === destination.droppableId)
//       const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0]

//       const sourceListRef = doc(db, 'lists', source.droppableId)
//       sourceList.cards.splice(source.index, 1)

//       await updateDoc(sourceListRef, {
//         cards: sourceList.cards
//       })

//       const destinationListRef = doc(db, 'lists', destination.droppableId)
//       destinationList.cards.splice(destination.index, 0, draggingCard)

//       await updateDoc(destinationListRef, {
//         cards: destinationList.cards
//       })
//     }
//   }

//   return (
//     <>
// <div className='container'>
//       <storeApi.Provider
//         value={
//           {
//             addMoreCard,
//             addMoreList,
//             updateCardTitle,
//             removeCard,
//             updateListTitle,
//             deleteList
//           }
//         }
//       >
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId='app' direction='horizontal' type='list'>
//             {
//               (provided) => (
//                 <div className='wrapper'
//                   ref={provided.innerRef}>
//                   {
//                     lists.map((list, index) => (
//                       <List list={list} key={list.id} index={index} />
//                     ))
//                   }
//                   <div>
//                     <InputContainer type='list' />
//                   </div>
//                   {provided.placeholder}
//                 </div>
//               )
//             }
//           </Droppable>
//         </DragDropContext>
//       </storeApi.Provider>

//       </div>
//     </>

//   )
// }

// export default Board






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
      return
    }
  
    if (type === 'list') {
      const newListOrder = Array.from(lists)
      const [removed] = newListOrder.splice(source.index, 1)
      newListOrder.splice(destination.index, 0, removed)
  
      for (let index = 0; index < newListOrder.length; index++) {
        const list = newListOrder[index];
        const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, list.id)
        await updateDoc(listRef, {
          position: index
        })
      }
      setLists(newListOrder)
      return
    }
  
    const sourceList = lists.find(list => list.id === source.droppableId)
    const destinationList = lists.find(list => list.id === destination.droppableId)
  
    if (sourceList === destinationList) {
      const newCardOrder = Array.from(sourceList.cards)
      const [removed] = newCardOrder.splice(source.index, 1)
      newCardOrder.splice(destination.index, 0, removed)
  
      const listRef = doc(db, `users/${auth.currentUser.uid}/lists`, sourceList.id)
      await updateDoc(listRef, {
        cards: newCardOrder
      })
  
      sourceList.cards = newCardOrder
    } else {
      const sourceCardOrder = Array.from(sourceList.cards)
      const [removed] = sourceCardOrder.splice(source.index, 1)
  
      const destinationCardOrder = Array.from(destinationList.cards)
      destinationCardOrder.splice(destination.index, 0, removed)
  
      const sourceListRef = doc(db, `users/${auth.currentUser.uid}/lists`, sourceList.id)
      await updateDoc(sourceListRef, {
        cards: sourceCardOrder
      })
  
      const destinationListRef = doc(db, `users/${auth.currentUser.uid}/lists`, destinationList.id)
      await updateDoc(destinationListRef, {
        cards: destinationCardOrder
      })
  
      sourceList.cards = sourceCardOrder
      destinationList.cards = destinationCardOrder
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
                  <List list={list} key={list.id} index={index} />
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








// cardsArray: (3) [{…}, {…}, {…}]
// 0: 
// id: "c9dd1133-3a78-4eea-858a-7d9f7530159d"
// modal: {description: ''}
// title:"d"
// [[Prototype]]: Object

// 1: 
// id: "b9db655b-e312-4ddd-aff0-34f8cf3b19bf"
// modal: {description: ''}
// title: "f"
// [[Prototype]]: Object
// 2: 
// id: "066db545-b3c6-4b76-9890-454028b1ecd7"
// modal: {description: ''}
// title: "ddd"
// [[Prototype]]: Object
// length: 3





