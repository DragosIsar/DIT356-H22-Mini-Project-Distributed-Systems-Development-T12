import { Api } from './Api'
import ClinicsTypes from '../Types/ClinicsTypes'

export const clinicApi = {
  getAllClinics: <T,>() => {
    Api.get<Array<ClinicsTypes>>(`/clinics`)
    .then(res => {
      console.log(res.data)
    });
  },
  getClinic: (clinicId : number) => {
    Api.get(`clinics/${clinicId}`)
  }
}