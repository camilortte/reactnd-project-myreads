import React  from 'react';
import Category from './Category';
import PropTypes from "prop-types";
import BookList from "./BookList";


function CategoryList(props){

    const { categories, myBooks, onChangeBooksStatus, loading } = props;

    return (
        <div className="list-books-content">
            {categories.map((shelf) =>
                <Category key={shelf.id} name={shelf.id}
                          books={myBooks.filter((book) => book.shelf === shelf.id)}
                          onChangeBooksStatus={onChangeBooksStatus}
                          loading={loading}
                />
            )}
        </div>
    );

}

BookList.propTypes = {
    categories: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onChangeBooksStatus: PropTypes.func.isRequired
};

export default  CategoryList;