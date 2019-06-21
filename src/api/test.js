import axios from '@/libs/api.request'

export const getx = () => {
    return axios.request({
        url: '/getx',
        method: 'get'
    })
}

export const postx = () => {
    return axios.request({
        url: '/postx',
        method: 'post',
    })
}