import request from '@/utils/request'

export function refundInfoList (data) {
  return request({
    url: '/refundInfo/list',
    method: 'post',
    data
  })
}
