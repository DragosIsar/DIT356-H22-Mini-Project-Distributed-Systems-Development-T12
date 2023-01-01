import { makeStyles } from "@material-ui/core";
import { Component, ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Clinics from "./clinics";

import { clinicApi } from '../services/clinic'
import MapPoint from "./MapPoint";
import OverlayContainer from "./OverlayContainer";
import ClinicProps from '../Types/ClinicsTypes';
import { responsiveProperty } from "@mui/material/styles/cssUtils";

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
}

type GetClinicsResponse = {
  data: ClinicProps[];
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

  const Clinicss = clinicApi.getAllClinics();
  console.log(Clinicss);

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
    {Clinics.map((clinic : ClinicProps, index : number) => (
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