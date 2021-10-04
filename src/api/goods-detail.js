import axios from '@/utils/http'

export const getGoodsDetail = (params = {}) => axios.get('/goods/detail', {params})
