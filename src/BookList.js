import React  from 'react';
import Book from './Book';


function BookList(props){
    const { onChangeBooksStatus, books, loading } = props;

    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.length > 0
                    ? books.map((book) => <li key={book.id}><Book book={book} onChangeBooksStatus={onChangeBooksStatus} loading={loading}/></li>)
                    : `No books`
                }
            </ol>
        </div>
    );
}

export default  BookList;