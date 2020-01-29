import axios from 'axios';

export const getFavorites = () => (
    axios.get('/favorite')
)

export const createFavorite = data => (
    axios.post('/favorite', data)
)


export const deleteFavorite = (data) => (
    axios.delete('/favorite', { data })
)