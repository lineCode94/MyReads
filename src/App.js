import "./App.css";
import { useState ,useEffect} from "react";
import Search from "./components/Search";
import Shelf from "./components/Shelf";
import *as BookAPI from "./BooksAPI"
import {Routes,Route} from 'react-router-dom'

function App() {
  // const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks]= useState([])
 
  
//show serarch page 
// const showSearch = () => setShowSearchpage(!showSearchPage)
//fetch all books 
useEffect(()=>{
  const allBooks = async ()=>{
   const res = await BookAPI.getAll()
    setAllBooks(res)
  // console.log(res)
 
  }
  allBooks()
},[])
 
 //update shelves
const onUpdateShelf = (book, shelf)=>{
  const updatedBooks = allBooks.map((b)=>{
    if(b.id === book.id){
      b.shelf = shelf
    }
    return b;
   })

setAllBooks(updatedBooks)
const update = async () => {
  await BookAPI.update(book, shelf); 
  }
  update()

};
//search 
// const getNewBooks =(q)=>{
// const addNewBooks = async()=>{
//   const res = await BookAPI.search(q,30)
//   // console.log(res)
//   setSearchResult(res)
// }
// addNewBooks()
// }

  return (
    <div  className="app">
   <Routes>
      
     
        
        <Route exact path='/' element={
        <div className="list-books">
         
          <Shelf shelf="currentlyReading"  shelfTitle="Currently Reading" allBooks={allBooks} onUpdateShelf={onUpdateShelf}/>
       <Shelf shelf="wantToRead" shelfTitle="Want To Read"  allBooks={allBooks} onUpdateShelf={onUpdateShelf}/>
       <Shelf shelf="read" shelfTitle="Read"  allBooks={allBooks} onUpdateShelf={onUpdateShelf}/>
        
       </div>
         }  />
        <Route path="/search" element={<Search   onUpdateShelf={onUpdateShelf}  />}/>
       
       
      
      </Routes>
    </div>
  );
}

export default App;
