import { Api } from './Api'

export const appointmentApi = {
  getAppointments: ( clinicId : number ) => {
    Api.get(`/clinics/${clinicId}/appointments`)
  },
  makeAppointment: ( clinicId : number)=> {
    Api.post(`clinics/${clinicId}/appointments`)
  }
}