import React from 'react';
import Navbar from '../navbar/navbar_container';


function Create(props) {
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [genre, setGenre] = React.useState("");

    const onChangeHandle = (callback) => {
        return e => {
            e.preventDefault();
            callback(e.currentTarget.value);
        }
    }

    const createBook = e => {
        e.preventDefault();
        const data = {
            title,
            author,
            genre,
        }
        props.createBook(data).then(() => {
            setTitle("")
            setAuthor("")
            setGenre("")
            props.history.push("/")
        });
    }

    return (
        <div>
            <Navbar />
            <div className="flexRow flexCenter">
                <form className="userForm shadow" onSubmit={createBook}>
                    <label htmlFor="title">
                        <div className="width100">Title</div><input type="text" id="title" placeholder="Lord of the Rings" value={title} onChange={onChangeHandle(setTitle)} required />
                    </label>
                    <label htmlFor="author">
                        <div className="width100">Author</div><input type="text" id="author" placeholder="author" value={author} onChange={onChangeHandle(setAuthor)} required />
                    </label>
                    <label htmlFor="genre">
                        <div className="width100">Genre</div><input type="text" id="genre" placeholder="Fantasy" value={genre} onChange={onChangeHandle(setGenre)} required />
                    </label>
                    <label htmlFor="create">
                        <input id="create" className="submitButton width100" type="submit" value="Create Book" />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Create;