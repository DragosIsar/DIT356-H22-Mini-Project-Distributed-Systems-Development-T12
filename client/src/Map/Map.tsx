import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import {clinicApi} from "../services/clinic"
//import Clinics from "./clinics";
import MapPoint from "./MapPoint";
import OverlayContainer from "./OverlayContainer";

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
}

type  clinicProps = {
  coordinate: {
    latitude: number,
    longitude: number
  },
  name: string,
  dentists: number,
  address: string,
  city: string
}


const useStyles = makeStyles({
  map: {
    width: '50',
    height: '60vh'
  }
})

function Map({ center, zoom }: MapProps) {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map<Element> | null>(null)
  const classes = useStyles();
  const Clinics = clinicApi.getAllClinics();

  useEffect(() => {
    if (ref.current) { 
      let createdMap = new window.google.maps.Map(
        ref.current,
        {
          center,
          zoom,
          disableDefaultUI: true,
          clickableIcons: false
        }
      );
      setMap(createdMap)
    }
  }, [center, zoom]);

  return <div ref={ref} id="map" className={classes.map}>
    {Clinics.map((clinic: clinicProps, index: number) => (
      <OverlayContainer
        map={map}
        position={{
          lat: clinic.coordinate.latitude,
          lng: clinic.coordinate.longitude
        }}
        key={index}
      >
        <MapPoint
          name={clinic.name}
          dentists={clinic.dentists}
          address={clinic.address}
          city={clinic.city}
        />
      </OverlayContainer>
    ))}
  </div>;
}
export default Map