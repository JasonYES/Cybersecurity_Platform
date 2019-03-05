import axios from '@/libs/api.request'


export const getMapData = () => {
    return axios.request({
      url: 'get_drag_list',
      method: 'get'
    })
  }

///////////////  /assets/maps/world-eckert3-lowres.geo.json

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
