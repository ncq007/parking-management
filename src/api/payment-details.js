import request from '@/utils/request'

export function payInfoList (data) {
  return request({
    url: '/payInfo/list',
    method: 'post',
    data
  })
}
