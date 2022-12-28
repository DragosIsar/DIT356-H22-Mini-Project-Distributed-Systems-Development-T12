import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from 'axios'

import Clinic from '../Types/Clinic'
import ClinicService from '../services/ClinicService'
//import Clinics from "./clinics";
import MapPoint from "./MapPoint";
import OverlayContainer from "./OverlayContainer";

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
}

interface ClinicCollection {
  Items: Clinic[],
  Count: number,
  ScannedCount: number
}


const useStyles = makeStyles({
  map: {
    width: '50',
    height: '60vh'
  }
})

async function Map({ center, zoom }: MapProps) {
  const ref = useRef(null);
  const [allClinics, setAllClinics] = useState({});
  const [clinicss, setClinics] = useState<Clinic[]>([]);
  const [map, setMap] = useState<google.maps.Map<Element> | null>(null)
  const classes = useStyles();

  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingClinics, refetch: fetchAllClinics } = useQuery<Clinic[], Error>(
    "query-clinics",
    async () => {
      return await ClinicService.getAllClinics();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setAllClinics(fortmatResponse(res));
      },
      onError: (err: any) => {
        setAllClinics(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingClinics) setAllClinics("loading...");
  }, [isLoadingClinics]);

  function getAllData() {
    try {
      fetchAllClinics();
    } catch (err) {
      setAllClinics(fortmatResponse(err));
    }
  }

  console.log(allClinics);

  axios.get<ClinicCollection>('https://lhsqon6i0j.execute-api.eu-central-1.amazonaws.com/v2/getclinics')
  .then(response => {
    console.log(response.data);
});

  const Clinics = await ClinicService.getAllClinics();

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
    {Clinics.map((clinic) => (
      <OverlayContainer
        map={map}
        position={{
          lat: clinic.coordinate.latitude,
          lng: clinic.coordinate.longitude
        }}
        key={clinic.id}
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