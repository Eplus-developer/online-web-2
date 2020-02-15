import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function getActivity() {
  return request({
    url: '/activity/all',
    method: 'get',
  })
}


