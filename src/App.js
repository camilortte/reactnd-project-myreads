import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReadsContainer from './MyReadsContainer';
import SearchContainer from './SearchContainer';
import { Route } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";


class App extends React.Component {

    state = {
        // This categories allow us to have dynamic categories
        categories: [
            {id: 'currentlyReading', name: 'Currently reading'},
            {id: 'wantToRead', name: 'Want to read'},
            {id: 'read', name: 'Read'},
        ],
        myBooks: [],
        loading: {
            getAll: true,
            updateBook: false
        }
    };

    changeBooksStatus = (book, shelf) => {
        const { myBooks } = this.state;
        this.setState({loading: {updateBook: true, getAll: false} });
        BooksAPI.update(book, shelf)
            .then((response) => {
                const bookExist = myBooks.find(({ id }) => id === book.id);
                book.shelf = shelf;
                if(bookExist){
                    // Book already exist
                    myBooks.filter(({ id }) => id !== book.id);
                    if(book.shelf !== 'none') {
                        // Update list
                        this.setState((prevState) => ({
                            myBooks: [...prevState.myBooks.filter(({id}) => id !== book.id), book]
                        }));
                    }else{
                        // Remove from list
                        this.setState((prevState) => ({
                            myBooks: [...prevState.myBooks.filter(({id}) => id !== book.id)]
                        }));
                    }
                }else{
                    // Book doesn't exist
                    if(book.shelf !== 'none'){
                        this.setState((prevState) => ({
                            myBooks: prevState.myBooks.concat(book)
                        }));
                    }
                }
            })
            .catch(error => console.log(`Error: ${error.message}`))
            .finally(() =>  this.setState({loading: {updateBook: false, getAll: false} }) );
    };

    componentDidMount(){
        // Get my books
        BooksAPI.getAll()
            .then((response) => {
                this.setState({
                    myBooks: response
                });
            })
            .finally(() =>  this.setState({loading: {updateBook: false, getAll: false} }) );
    }

    render() {
        const { categories, myBooks, loading } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={()=>
                    <MyReadsContainer categories={categories} myBooks={myBooks} onChangeBooksStatus={this.changeBooksStatus} loading={loading}/>}/>
                <Route path="/search" render={()=>
                    <SearchContainer categories={categories} myBooks={myBooks} onChangeBooksStatus={this.changeBooksStatus}/>}/>
            </div>
        )
    }
}

export default App
