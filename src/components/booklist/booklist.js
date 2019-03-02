import React from 'react'

const Booklist = ({ books }) => (
    <div className='book-list'>{books.map((book) =>
        <div className='book'>
            <img alt='Book' src={(book.volumeInfo.imageLinks)?(book.volumeInfo.imageLinks.smallThumbnail):''} ></img>
            <h4>{book.volumeInfo.title}</h4>
            <p>By: {book.volumeInfo.authors}</p>
            <p>Published By: {book.volumeInfo.publisher}</p>
            <a href={book.volumeInfo.infoLink}><button>Read More</button></a></div>
    )}
    </div>
)

export default Booklist