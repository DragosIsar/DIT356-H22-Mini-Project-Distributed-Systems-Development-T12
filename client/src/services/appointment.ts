import { Api } from './Api'
import axios, { AxiosError, AxiosResponse } from 'axios';
import AppointmentType from '../interfaces/AppointmentType';
import ITimeSlots from '../interfaces/ITimeSlots';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const appointmentApi = {
  getAppointments: async (clinicId: string, date: string)  => {
    const result = await Api.get<ITimeSlots>(`/schedule/${clinicId}/${date}`);
    return result;
  },
  makeAppointment: async <T>(data: AppointmentType) => {
    return await Api.post<T>(`/schedule`, data);
  }
}