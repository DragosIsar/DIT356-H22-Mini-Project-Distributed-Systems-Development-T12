export default interface ClinicProps {
  coordinate: {
    latitude: number,
    longitude: number
  },
  name: string,
  dentists: number,
  address: string,
  city: string
}