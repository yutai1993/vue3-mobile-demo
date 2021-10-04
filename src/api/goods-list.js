import axios from '@/utils/http'

export const getGoods = (params = {}) => axios.get('/goods/search', { params })
