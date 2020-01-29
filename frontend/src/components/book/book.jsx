import React from 'react';
import Navbar from '../navbar/navbar_container';
import { createFavorite, deleteFavorite} from '../../utils/fav_util';
import { createNote } from '../../utils/note_util';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: "",
            title: "",
            author: "",
            genre: "",
            note: "",
            delete: false,
        }
        this.openModal = this.openModal.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    openModal(e) {
        e.preventDefault();
        this.setState({ modal: true })
    }

    openDelete(e) {
        e.preventDefault();
        this.setState({ modal: true, delete: true })
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({ modal: false, delete: false})
    }

    updateBook(e){
        e.preventDefault();
        const data = {
            id: parseInt(this.state.id),
            title: this.state.title,
            author: this.state.author,
            genre: this.state.genre,
        }
        this.props.updateBook(data).then(() => {
            this.setState({ modal: false, delete: false })
        })
    }

    deleteBook(e){
        e.preventDefault();
        const data = {
            id: parseInt(this.state.id),
            title: this.state.title,
            author: this.state.author,
            genre: this.state.genre,
        }
        this.props.deleteBook(data).then(() => {
            this.props.history.push("/")
        })
    }

    onChangeHandle(field) {
        return e => {
            e.preventDefault();
            this.setState({ [field]: e.currentTarget.value})
        }
    }

    addFavorite(e){
        e.preventDefault();
        const data = {
            id: parseInt(this.state.id),
        }
        createFavorite(data).then(() => {
            const bookId = parseInt(this.props.match.params.bookId);
            this.props.getBook(bookId);
        })
    }

    removeFavorite(id){
        return e => {
            e.preventDefault();
            const data = {
                id: parseInt(id),
            }
            deleteFavorite(data).then(() => {
                const bookId = parseInt(this.props.match.params.bookId);
                this.props.getBook(bookId);
            })
        }
    }

    addNote(e){
        e.preventDefault();
        const data = {
            message: this.state.note,
            id: parseInt(this.state.id),
        }
        createNote(data).then(() => {
            this.setState({note: ""}, () => {
                const bookId = parseInt(this.props.match.params.bookId);
                this.props.getBook(bookId);
            })
        })
    }

    componentDidMount() {
        const bookId = parseInt(this.props.match.params.bookId);
        this.props.getBook(bookId);
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.match.params.bookId !== prevProps.match.params.bookId){
            if(this.state.modal){
                this.setState({modal: false})
            }
            const bookId = parseInt(this.props.match.params.bookId);
            this.props.getBook(bookId);
        }

        if (this.props.book && this.props.book !== prevProps.book){
            this.setState({
                id: this.props.book.id,
                title: this.props.book.title,
                author: this.props.book.author,
                genre: this.props.book.genre,
            })
        }
    }

    render(){
        let book = null;
        let modal = null;
        if(this.props.book){
            let fav = <div className="pointer favText" onClick={this.addFavorite}>Add to favorites</div>;
            if (this.props.book.favorites && this.props.book.favorites.length > 0){
                fav = <div className="pointer favText"  onClick={this.removeFavorite(this.props.book.favorites[0].id)}>Remove from favorites</div>
            }

            let addNoteEle = <div className="shadow flexRow marginBottom20 flexCenter">
                <form className="userForm" onSubmit={this.addNote}>
                    <label htmlFor="note">
                        <input type="text" id="note" placeholder="Quite nicely done" value={this.state.note} onChange={this.onChangeHandle("note")} required />

                    </label>
                    <label htmlFor="createNote">
                        <input id="createNote" className="submitButton width100" type="submit" value="Add Note" />
                    </label>
                </form>
            </div>

            let notes = null;
            if (this.props.book.notes){
                notes = this.props.book.notes.map((note) => {
                    let deleteSpan = null;
                    if (note.user.id === this.props.loggedInUser.id){
                        deleteSpan = <span className="pointer deleteNote">
                            Delete
                            </span>
                    }
                    return <React.Fragment key={"note" + note.id}>
                        <div className="flexRow flexCenter shadow bookListingContainer">
                            <div className="noteListing width100">
                                <div className=""><span>{note.user.displayName}: </span><span>{note.message}</span></div>
                            </div>
                            {deleteSpan}
                        </div>
                    </React.Fragment>
                })
            }

            notes = <div className="flexColReverse width100 flexCenter">
                {notes}
            </div>

            book = <div  className="flexCol flexCenter">
                {fav}
                <div className="bookListingContainer shadow flexRow flexBetween">
                    <ul className="bookListing">
                        <li>Title: {this.props.book.title}</li>
                        <li>Author: {this.props.book.author}</li>
                        <li>Genre: {this.props.book.genre}</li>
                    </ul>
                    <div className="flexCol bookOptions">
                        <span className="editButton" onClick={this.openModal}>Edit</span>
                        <span className="deleteButton" onClick={this.openDelete}>Delete</span>
                    </div>
                </div>
                {addNoteEle}
                {notes}
            </div>
        }
        if (this.state.modal && !this.state.delete && this.props.book) {
            modal = <div className="modalBackground" onClick={this.closeModal}>
                <div className="modalChild" onClick={e => e.stopPropagation()}>
                    <div className="flexRow flexCenter">
                        <form className="userForm shadow" onSubmit={this.updateBook}>
                            <label htmlFor="title">
                                <div className="width100">Title</div><input type="text" id="title" placeholder="Lord of the Rings" value={this.state.title} onChange={this.onChangeHandle("title")} required />
                            </label>
                            <label htmlFor="author">
                                <div className="width100">Author</div><input type="text" id="author" placeholder="author" value={this.state.author} onChange={this.onChangeHandle("author")} required />
                            </label>
                            <label htmlFor="genre">
                                <div className="width100">Genre</div><input type="text" id="genre" placeholder="Fantasy" value={this.state.genre} onChange={this.onChangeHandle("genre")} required />
                            </label>
                            <label htmlFor="update">
                                <input id="update" className="submitButton width100" type="submit" value="Update Book" />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        } else if (this.state.modal && this.state.delete && this.props.book){
            modal = <div className="modalBackground" onClick={this.closeModal}>
                <div className="modalChild" onClick={e => e.stopPropagation()}>
                    <div className="flexRow flexCenter">
                        
                        <form className="userForm shadow" onSubmit={this.deleteBook}>
                            <h1 className="header">Are you sure you want to delete this book?</h1>
                            <label htmlFor="delete">
                                <input id="delete" className="deleteButton width100" type="submit" value="Delete Book" />
                            </label>
                            <label>
                                <div className="pointer" onClick={this.closeModal}>
                                    Cancel
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        }
        return <React.Fragment>
                <Navbar />
                {modal}
                {book}
            </React.Fragment>
        }
}
export default Book;