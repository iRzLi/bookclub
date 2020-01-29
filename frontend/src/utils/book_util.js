import axios from 'axios';


export const getBooks = () => (
    axios.get('/book')
)
    
export const getBook = id => (
    axios.get(`/book/${id}`)
)
        
export const createBook = data => (
    axios.post('/book', data)
)
        
export const updateBook = (data) => (
    axios.put('/book', data)
)

export const deleteBook = (data) => (
    axios.delete('/book', {data})
)