import React from 'react';
import BookList from './BookList';


class Category extends React.Component {

    render(){
        const { name } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <BookList />
            </div>
        );
    }

}

export default  Category;