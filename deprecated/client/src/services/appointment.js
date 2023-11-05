import { Api } from '@/services/Api'

export const appointmentApi = {
  getAppointments: clinicId => {
    Api.get(`/clinics/${clinicId}/appointments`)
  },
  makeAppointment: clinicId => {
    Api.post(`clinics/${clinicId}/appointments`)
  },
  deleteAppointment: (clinicId, appointmentId) => {
    Api.delete(`clinics/${clinicId}/appointments/${appointmentId}`)
  }
}