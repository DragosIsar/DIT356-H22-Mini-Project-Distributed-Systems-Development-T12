import { Api } from './Api'

interface Clinic {
  clinicId: {N: string},
  name: {S: string},
  address: {S: string},
  city: {S: string},
  coordinate: {M: {
    latitude: {N: string},
    longitude: {N: string}
  }},
  openinghours: {M: {
    monday: {S: string},
    tuesday: {S: string},
    wednesday: {S: string},
    thursday: {S: string},
    friday: {S: string}
  }},
  dentists: {N: string},
  owner: {S: string}
};


export const clinicApi = {
  getAllClinics: () => {
    Api.get(`/clinics`)
  },

  getClinic: async (clinicId: string) => {

    let result;
    result = await Api.get<Clinic>(`clinics/${clinicId}`);
    return result;
  }
}