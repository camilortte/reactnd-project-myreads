import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from "./CategoryList";
import PropTypes from 'prop-types';


function MyReadsContainer(props){
    const { categories, myBooks, onChangeBooksStatus, loading } = props;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            { loading.getAll
                ? <div className="bookshelf-books">...Loading...</div>
                : <CategoryList categories={categories} myBooks={myBooks} onChangeBooksStatus={onChangeBooksStatus}
                                loading={loading.updateBook}/>}


            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

MyReadsContainer.propTypes = {
    categories: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    loading: PropTypes.object.isRequired,
    onChangeBooksStatus: PropTypes.func.isRequired
};


export default  MyReadsContainer;