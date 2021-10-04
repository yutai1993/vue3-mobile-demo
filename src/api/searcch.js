import axios from '@/utils/http'
export const getSearch = (params = {}) => axios.get('/goods/qsearch', { params })
