import axios from '@/libs/api.request'

export const getScores = () => {
    return axios.request({
        url: 'visual/scores',
        method: 'get'
    })
}

export const getCountries = () => {
    return axios.request({
        url: 'visual/countries',
        method: 'get'
    })
}

export const getOrgs = () => {
    return axios.request({
        url: 'visual/orgs',
        method: 'get'
    })
}

export const getDname = () => {
    return axios.request({
        url: 'visual/dname',
        method: 'get'
    })
}

export const getIndexes = () => {
    return axios.request({
        url: 'visual/indexes',
        method: 'get'
    })
}
////////////////////



export const getMapData = () => {
    return axios.request({
        url: 'get_drag_list',
        method: 'get'
    })
}


export const getDragList = () => {
  return axios.request({
    url: '/assets/maps/world-eckert3-lowres.geo.json',
    method: 'get'
  })
}

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
