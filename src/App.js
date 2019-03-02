import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Loader from './components/loader/loader'
import Search from './components/searchBox/search'
import Booklist from './components/booklist/booklist'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  state = {
    books: [],
    isFetched: false,
    items: 0,
    name: ''
  }


  getBooks(query) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then(json => this.setState({ books: json.items, isFetched: false, items: json.totalItems }))
      console.log(this.state);
  }

  submit(e) {
    const { query } = this.refs
    this.setState({ isFetched: true, name: query.value })
    e.preventDefault()
    this.getBooks(query.value)
    query.value = ''
    query.focus()
  }

  render() {
    const { books, isFetched, name, items } = this.state
    return (
      <div className="App">
        <div className="header">
          <Search message="BOOK FINDER" />
          <form className="form" onSubmit={this.submit}>
            <input type="search" ref="query" placeholder="Search by book title or author" size="60" required />
            <button>Search</button>
          </form>

          {
            !isFetched && items === 0 && name.trim() === '' && <p id="msg">Nothing Here Yet! Try searching for a book</p>
          }

          {
            !isFetched && items === 0 && name.trim() !== '' && <p id="msg">Nothing Found! Try Another Query</p>
          }

        </div>


        {
          isFetched && <Loader />
        }

        {
          !isFetched && items !== 0 && <Booklist books={books} />
        }
      </div >

    )
  }
}

export default App;
