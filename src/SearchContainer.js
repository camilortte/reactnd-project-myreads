import React, { Component } from 'react';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import { search }  from './BooksAPI';
import PropTypes from "prop-types";
import debounce from 'lodash.debounce';


class SearchContainer extends Component {

    state = {
        query: '',
        searchResult: [],
        loading: false
    };

    constructor(props){
        super(props);
        this.emitChange = debounce(this.emitChange, 250)
    }

    componentWillUnmount() {
        this.emitChange.cancel();
    }

    handleChange = (event) => {
        this.setState({query: event.target.value});
        this.emitChange(event.target.value);
    };

    submitForm = (event) => {
        if( event ){
            event.preventDefault();
        }

        const { query } = this.state;
        this.emitChange(query);
    };

    emitChange(query){
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
    }

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
                        : <BookList books={searchResult} onChangeBooksStatus={onChangeBooksStatus} loading={false}/>}
                </div>
            </div>
        );
    }

}

SearchContainer.propTypes = {
    onChangeBooksStatus: PropTypes.func.isRequired
};


export default  SearchContainer;