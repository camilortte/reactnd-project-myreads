import React, { Component } from 'react';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import { search }  from './BooksAPI';
import PropTypes from "prop-types";


const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;


class SearchContainer extends Component {

    state = {
        query: '',
        searchResult: [],
        loading: false
    };

    componentWillMount() {
        this.timer = null;
    }

    handleChange = (event) => {
        clearTimeout(this.timer);
        this.setState({query: event.target.value});
        this.timer = setTimeout(this.submitForm, WAIT_INTERVAL);
    };

    handleKeyDown = (event) => {
        if (event.keyCode === ENTER_KEY) {
            this.submitForm();
        }
    };

    submitForm = (event) => {
        if( event ){
            event.preventDefault();
        }

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

        }else{
            this.setState({searchResult: []});
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
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={query} onKeyDown={this.handleKeyDown}/>
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

SearchContainer.propTypes = {
    onChangeBooksStatus: PropTypes.func.isRequired
};


export default  SearchContainer;