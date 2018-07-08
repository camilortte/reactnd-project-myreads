import React, { Component } from 'react';
import Category from './Category';


class CategoryList extends Component {

    render(){
        const { categories } = this.props;

        return (
            <div className="list-books-content">
                {categories.map((category) => <Category key={category} name={category}/>)}
            </div>
        );
    }

}

export default  CategoryList;