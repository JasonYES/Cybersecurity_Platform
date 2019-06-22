import axios from '@/libs/api.request2'

export const cbstart = () => {
    return axios.request({
        url: '/start',
        method: 'get'
    })
}

export const cbpause = () => {
    return axios.request({
        url: '/pause',
        method: 'get',
    })
}

export const cbprogress = () => {
    return axios.request({
        url: '/process',
        method: 'get'
    })
}

export const cbend = () => {
    return axios.request({
        url: '/stop',
        method: 'get'
    })
}

export const postx = () => {
    return axios.request({
        url: '/postx',
        method: 'post',
    })
}