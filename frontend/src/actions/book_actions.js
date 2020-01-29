import * as BookUtil from '../utils/book_util';


export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const RECEIVE_BOOK = 'RECEIVE_BOOK';
// export const CREATED_BOOK = 'CREATED_BOOK';
export const DELETED_BOOK = 'DELETED_BOOK';
// export const UPDATED_BOOK = 'UPDATED_BOOK';

const receiveBooks = books => {
    return {
        type: RECEIVE_BOOKS,
        books
    }
}

const receiveBook = book => {
    return {
        type: RECEIVE_BOOK,
        book
    }
}

// const createdBook = book => {
//     return {
//         type: CREATED_BOOK,
//         book
//     }
// }

// use deletedBook for errors since we'll set our state to null
const deletedBook = () => {
    return {
        type: DELETED_BOOK,
    }
}

// const updatedBook = book => {
//     return {
//         type: UPDATED_BOOK,
//         book
//     }
// }

export const getBooks = () => dispatch => (
    BookUtil.getBooks()
        .then(res => {
            dispatch(receiveBooks(res.data.books));
        })
)

export const getBook = (id) => dispatch => (
    BookUtil.getBook(id)
        .then(res => {
            dispatch(receiveBook(res.data));
        })
        .catch(err => {
            dispatch(deletedBook());
        })
)

export const createBook = (data) => dispatch => (
    BookUtil.createBook(data)
        .then(res => {
            dispatch(receiveBook(res.data));
        })
        .catch(err => {
            dispatch(deletedBook());
        })
)

export const updateBook = (data) => dispatch => (
    BookUtil.updateBook(data)
        .then(res => {
            dispatch(receiveBook(res.data));
        })
        .catch(err => {
            dispatch(deletedBook());
        })
)

export const deleteBook = (data) => dispatch => (
    BookUtil.deleteBook(data)
        .then(res => {
            dispatch(deletedBook());
        })
)