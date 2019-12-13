/*
  导出的 axios 请求
*/
import request from '@/utils/request'

/*
  @params { String } url 接口地址
  @params { Object } data 入参
  @params { String } name 下载后展示的名称
*/
export function exp (url, data, name) {
  request({
    method: 'post',
    url: url,
    data,
    responseType: 'blob'
  }).then(res => {
    const link = document.createElement('a')
    const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `${name}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
