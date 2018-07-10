import React  from 'react';
import Category from './Category';


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

export default  CategoryList;