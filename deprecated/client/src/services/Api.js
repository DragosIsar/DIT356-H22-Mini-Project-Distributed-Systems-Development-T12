import axios from "axios";

export const Api = axios.create({
  baseURL: 'https://bmuk2llzl8.execute-api.eu-central-1.amazonaws.com/default'
});

export default (endpoint) => {
  return axios.create({
    baseURL: 'https://bmuk2llzl8.execute-api.eu-central-1.amazonaws.com/default'
  })
}