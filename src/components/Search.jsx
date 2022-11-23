import React from 'react'
import { useState ,useEffect} from 'react'
import { search } from '../BooksAPI'
import Book from './Book'
 
const Search = ({  onUpdateShelf }) => {
  const [query, setQuery]= useState('')
  const [searchResult,setSearchResult]= useState([])

useEffect(()=>{
  const addNewBooks = async()=>{
    if(query){

      const res = await search(query,30)
      console.log(res)
      setSearchResult(res)
    }
  }
  addNewBooks()
},[query])
 
  const updateQuery = (q)=>{
    setQuery(q.trim())
  }
  // const emptyQuery=()=>{
  //   updateQuery("")
  // }
  
  const showBooks = query === ''? <p style={{fontSize:"30px",color:"#fff"}}>  No Books to Show👀!</p>:  ( searchResult.map((book)=>(
    <Book onUpdateShelf={onUpdateShelf} key={book.id}   book={book}/>
  )))
  return (
    <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        href='/'
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
        value={query}
        onChange={(e)=>updateQuery(e.target.value)}
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
      </div>
    </div>
     <div className="search-books-results">
     <div className="bookshelf-books">
      <ol className="books-grid">{showBooks}</ol>
      </div>
    </div> 
  </div>
  )
}

export default Search