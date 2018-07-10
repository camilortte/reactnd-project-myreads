import React from 'react';
import BookList from './BookList';
import PropTypes from "prop-types";


function Category(props){
    const { name, books, onChangeBooksStatus, loading } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <BookList books={books} onChangeBooksStatus={onChangeBooksStatus} loading={loading}/>
        </div>
    );
}

Category.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onChangeBooksStatus: PropTypes.func.isRequired
};

export default  Category;