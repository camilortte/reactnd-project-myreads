import React from 'react';
import BookList from './BookList';


function Category(props){
    const { name, books, onChangeBooksStatus, loading } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <BookList books={books} onChangeBooksStatus={onChangeBooksStatus} loading={loading}/>
        </div>
    );
}

export default  Category;