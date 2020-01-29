import axios from 'axios';

export const createNote = data => (
    axios.post('/note', data)
)

export const deleteNote = data => (
    axios.delete('/note', {data})
)