import React from 'react';


class Book extends React.Component {

    constructor(props){
        super(props);
        let shelValue = 'none';
        const shelf = props.book.shelf;
        if(shelf){
            shelValue = shelf;
        }
        this.state = {
            shelf: shelValue
        };
    }


    handleChange = (event) => {
        this.setState({shelf: event.target.value});
        const { onChangeBooksStatus, book } = this.props;
        onChangeBooksStatus(book, event.target.value);
    };

    render(){
        const { book, loading } = this.props;
        const { shelf } = this.state;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 188,
                        backgroundImage: (book.imageLinks) ? `url("${book.imageLinks.thumbnail}")` : 'none'
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={this.handleChange} disabled={loading}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                { loading
                    ? (<div className="book-title">Updating</div>)
                    : ( <div><div className="book-title">{book.title}</div>
                        {book.authors && book.authors.map((author) =>
                            <div className="book-authors" key={author}> {author} </div>
                        )}</div>
                    )
                }
            </div>
        );
    }

}

export default  Book;