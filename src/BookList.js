import React  from 'react';
import Book from './Book';
import PropTypes from "prop-types";


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

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onChangeBooksStatus: PropTypes.func.isRequired
};


export default  BookList;