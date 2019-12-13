import request from '@/utils/request'

export function listParkByLogin (data) {
  return request({
    url: '/user/listParkByLogin',
    method: 'post',
    data
  })
}

export function userList (data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function userSave (data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

export function userListPark (data) {
  return request({
    url: '/user/listPark',
    method: 'post',
    data
  })
}

export function userListResource (data) {
  return request({
    url: '/user/listResource',
    method: 'post',
    data
  })
}

export function findUserById (data) {
  return request({
    url: '/user/findById',
    method: 'post',
    data
  })
}

export function isUserExist (data) {
  return request({
    url: '/user/exist',
    method: 'post',
    data
  })
}

export function delUserById (data) {
  return request({
    url: '/user/delById',
    method: 'post',
    data
  })
}

export function resetPwd (data) {
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data
  })
}
