import React, { Component } from 'react';
import Book from './Book';


class BookList extends Component {

    render(){
        let { books } = this.props;
        if( !books){
            books = [];
        }
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length > 0
                        ? books.map((book) => <li key={book.id}><Book book={book}/></li>)
                        : `No books`
                    }
                </ol>
            </div>
        );
    }

}

export default  BookList;