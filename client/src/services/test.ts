import { Api } from './Api'

export const testApi = {
  postTest: (data) => {
    Api.post(`/healthcheck`, data)
  }
}