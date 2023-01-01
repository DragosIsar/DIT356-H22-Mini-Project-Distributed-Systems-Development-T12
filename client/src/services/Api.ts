import axios from "axios";

export const Api = axios.create({
  baseURL: 'https://lhsqon6i0j.execute-api.eu-central-1.amazonaws.com/v2'
});