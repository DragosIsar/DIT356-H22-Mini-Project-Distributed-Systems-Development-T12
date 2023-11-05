import { Api } from '../services/Api'

export const testApi = {
  postTest: (data) => {
    Api.post(`/dentistimotest`, data)
  }
}