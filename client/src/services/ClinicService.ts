//import { Api } from '@/services/Api'
import { Api } from './Api'
import Clinic from '../Types/Clinic'
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

const getAllClinics = async () => {
  const response = await Api.get<Clinic[]>(`/clinics`);
  return response.data;
}

const getClinic = async (clinicId: any) => {
  const response = await Api.get(`clinics/${clinicId}`)
  return response.data;
}

const ClinicService = {
  getAllClinics,
  getClinic
}

export default ClinicService;