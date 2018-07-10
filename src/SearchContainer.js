import React, { Component } from 'react';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import { search }  from './BooksAPI';


class SearchContainer extends Component {

    state = {
        query: '',
        searchResult: [],
        loading: false
    };

    handleChange = (event) => {
        this.setState({query: event.target.value});
    };

    submitForm = (event) => {
        event.preventDefault();
        // TODO: Loading gif..
        const { query } = this.state;
        if( query !== '' && query !== undefined){
            this.setState({loading: true});
            search(query)
                .then((result) => {
                    // Update Shelf for books results
                    const { myBooks } = this.props;
                    result.map((item) => {
                        const bookExist = myBooks.find((book) => book.id === item.id);
                        if(bookExist){
                            item.shelf = bookExist.shelf
                        }
                        return item;
                    });
                    this.setState({searchResult: result});
                })
                .catch(error => {
                    console.log(`Error: ${error.message}`);
                    this.setState({searchResult: []});
                })
                .finally(() => this.setState({loading: false}));

        }
    };

    render(){
        const { query, searchResult, loading } = this.state;
        const { onChangeBooksStatus } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <form className="search-books-input-wrapper" onSubmit={this.submitForm}>
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={query}/>
                    </form>
                </div>
                <div className="search-books-results">
                    {loading
                        ? <div className="bookshelf-books">...Loading...</div>
                        : <BookList books={searchResult} onChangeBooksStatus={onChangeBooksStatus}/>}
                </div>
            </div>
        );
    }

}

export default  SearchContainer;