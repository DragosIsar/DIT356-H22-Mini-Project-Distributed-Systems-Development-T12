export default interface Clinic {
  coordinate: {
    latitude: number,
    longitude: number
  },
  owner: string,
  id: number,
  name: string,
  dentists: number,
  address: string,
  city: string,
}