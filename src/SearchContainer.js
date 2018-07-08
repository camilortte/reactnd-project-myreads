import React, { Component } from 'react';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import { search }  from './BooksAPI';


class SearchContainer extends Component {

    state = {
        query: '',
        searchResult: []
    };

    handleChange = (event) => {
        this.setState({query: event.target.value});
    };

    submitForm = (event) => {
        event.preventDefault();
        // TODO: Loading gif..
        const { query } = this.state;
        if( query !== '' && query !== undefined){
            search(query)
                .then((result) => {
                   this.setState({searchResult: result});
                });
        }
    };

    render(){
        const { query, searchResult } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <form className="search-books-input-wrapper" onSubmit={this.submitForm}>
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={query}/>
                    </form>
                </div>

                <BookList books={searchResult} />
            </div>
        );
    }

}

export default  SearchContainer;