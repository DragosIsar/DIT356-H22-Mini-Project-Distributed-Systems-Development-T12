//import { Api } from '@/services/Api'
import {Api} from './Api'
/*

export const clinicApi = {
  getAllClinics: () => {
    const response = Api.get(`/clinics`)
    return response.data
  },
  getClinic: clinicId => {
    Api.get(`clinics/${clinicId}`)
  }
}
*/



export const clinicApi = {
  getAllClinics: () => {
    return Api.get(`/clinics`)

  },
  getClinic: clinicId => {
    Api.get(`clinics/${clinicId}`)
  }
}


