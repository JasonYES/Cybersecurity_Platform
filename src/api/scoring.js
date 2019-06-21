import axios from '@/libs/api.request'

export const getScoringData = () => {
    return axios.request({
        url: '/api/scoring/data',
        method: 'get'
    })
}

export const getScoreFinal = () => {
    return axios.request({
        url: '/api/scorefinal/data',
        method: 'get'
    })
}

export const getFinalStatus = () => {
    return axios.request({
        url: '/api/scorefinal/status',
        method: 'get'
    })
}

export const getFinalDetail = (country, index) => {
    return axios.request({
        url: '/api/scorefinal/detail',
        method: 'get',
        params: {
            country,
            index
        }
    })
}


export const getReference = (country, index3) => {
    return axios.request({
        url: '/api/scorefinal/reference',
        method: 'post',
        params: {
            country,
            index3
        }
    })
}

export const manualSubmit = data => {
    return axios.request({
        url: '/api/scoring/submit',
        data: data,
        method: 'post'
    })
}

export const manualUndo = data => {
    return axios.request({
        url: '/api/scoring/undo',
        data: data,
        method: 'post'
    })
}

export const finalSubmit = data => {
    return axios.request({
        url: '/api/scorefinal/submit',
        data: data,
        method: 'post'
    })
}

export const finalUndo = data => {
    return axios.request({
        url: '/api/scorefinal/undo',
        data: data,
        method: 'post'
    })
}

export const archive = () => {
    return axios.request({
        url: '/api/scorefinal/archive',
        method: 'post'
    })
}
///////////////




export const errorReq = () => {
    return axios.request({
        url: 'error_url',
        method: 'post'
    })
}

export const saveErrorLogger = info => {
    return axios.request({
        url: 'save_error_logger',
        data: info,
        method: 'post'
    })
}

export const uploadImg = formData => {
    return axios.request({
        url: 'image/upload',
        data: formData
    })
}

export const getOrgData = () => {
    return axios.request({
        url: 'get_org_data',
        method: 'get'
    })
}
