import { Api } from '@/services/Api'

export const clinicApi = {
  getAllClinics: () => {
    Api.get(`/clinics`)
  },
  getClinic: clinicId => {
    Api.get(`clinics/${clinicId}`)
  }
}