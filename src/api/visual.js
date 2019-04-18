import axios from '@/libs/api.request'



export const getScores = () => {
  return axios.request({
    url: 'visual/scores',
    method: 'get'
  })
}

///////////////  /assets/maps/world-eckert3-lowres.geo.json


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
