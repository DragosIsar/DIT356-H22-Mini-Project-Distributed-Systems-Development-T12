export default interface ClinicType {
  clinicId: number,
  name: string,
  address: string,
  city: string,
  dentists: number,
  openinghours: {
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string
  },
  coordinate: {
    latitude: number,
    longitude: number
  },
  owner: string,
}