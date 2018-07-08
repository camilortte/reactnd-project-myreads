import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from "./CategoryList";


class MyReadsContainer extends React.Component {

    render(){
        const { categories } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <CategoryList categories={categories}/>

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }

}

export default  MyReadsContainer;