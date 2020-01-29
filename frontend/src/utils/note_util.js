import axios from 'axios';

export const createNote = data => (
    axios.post('/note', data)
)