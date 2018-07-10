import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from "./CategoryList";


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

export default  MyReadsContainer;