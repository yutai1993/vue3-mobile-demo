import axios from '@/utils/http'

export const getCategory = (params = {}) => axios.get('/categories', params)
