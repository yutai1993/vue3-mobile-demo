import axios from '@/utils/http'
/* 轮播 */
export const getSwiper = (params = {}) => axios.get('/home/swiperdata', {params})
/* 导航 */
export const getNavigation = (params = {}) => axios.get('/home/catitems', {params})
/* 楼层 */
export const getBuilding = (params = {}) => axios.get('/home/floordata', {params})
