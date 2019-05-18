import axios from '@/libs/api.request'

export const getSets = (start, limit, search) => {
    return axios.request({
        url: '/api/scoring/sets',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const postSets = data => {
    return axios.request({
        url: '/api/scoring/editsets',
        data: data,
        method: 'post'
    })
}

export const chooseSets = data => {
    return axios.request({
        url: '/api/scoring/choosesets',
        data: data,
        method: 'post'
    })
}

export const delSets = (id) => {
    return axios.request({
        url: '/api/scoring/delsets',
        method: 'get',
        params: {
            id
        }
    })
}

export const getIndex1 = (start, limit, search) => {
    return axios.request({
        url: '/api/admin/index1',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const delIndex1 = (id) => {
    return axios.request({
        url: '/api/admin/delindex1',
        method: 'get',
        params: {
            id
        }
    })
}

export const postIndex1 = data => {
    return axios.request({
        url: '/api/admin/editindex1',
        data: data,
        method: 'post'
    })
}


//

export const getIndex2 = (start, limit, search) => {
    return axios.request({
        url: '/api/admin/index2',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const delIndex2 = (id) => {
    return axios.request({
        url: '/api/admin/delindex2',
        method: 'get',
        params: {
            id
        }
    })
}

export const postIndex2 = data => {
    return axios.request({
        url: '/api/admin/editindex2',
        data: data,
        method: 'post'
    })
}

///

export const getIndex3 = (start, limit, search) => {
    return axios.request({
        url: '/api/admin/index3',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const delIndex3 = (id) => {
    return axios.request({
        url: '/api/admin/delindex3',
        method: 'get',
        params: {
            id
        }
    })
}

export const postIndex3 = data => {
    return axios.request({
        url: '/api/admin/editindex3',
        data: data,
        method: 'post'
    })
}

////

export const getCountry = (start, limit, search) => {
    return axios.request({
        url: '/api/admin/country',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const delCountry = (id) => {
    return axios.request({
        url: '/api/admin/delcountry',
        method: 'get',
        params: {
            id
        }
    })
}

export const postCountry = data => {
    return axios.request({
        url: '/api/admin/editcountry',
        data: data,
        method: 'post'
    })
}

/////

export const getUsers = (start, limit, search) => {
    return axios.request({
        url: '/api/admin/users',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const delUsers = (id) => {
    return axios.request({
        url: '/api/admin/delusers',
        method: 'get',
        params: {
            id
        }
    })
}

export const postUsers = data => {
    return axios.request({
        url: '/api/admin/editusers',
        data: data,
        method: 'post'
    })
}

//////


export const getOrgs = (start, limit, search) => {
    return axios.request({
        url: '/api/admin/orgs',
        method: 'get',
        params: {
            start,
            limit,
            search
        }
    })
}

export const delOrgs = (id) => {
    return axios.request({
        url: '/api/admin/delorgs',
        method: 'get',
        params: {
            id
        }
    })
}

export const postOrgs = data => {
    return axios.request({
        url: '/api/admin/editorgs',
        data: data,
        method: 'post'
    })
}

//////////////

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
