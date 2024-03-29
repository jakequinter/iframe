import { useState, useEffect, useRef } from "react";

import { GeolocationPositionCoords, GeolocationPositionError } from 'src/types/geolocation/geolocation'

export const useWatchLocation = (options = {}) => {
  const [location, setLocation] = useState<GeolocationPositionCoords>();
  const [error, setError] = useState("");
  // save the returned id from the geolocation's `watchPosition` to be able to cancel the watch instance
  const locationWatchId = useRef(null);

  // Success handler for geolocation's `watchPosition` method
  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `watchPosition` method
  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  // Clears the watch instance based on the saved watch id
  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current && geolocation) {
      // @ts-ignore
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Start to watch the location with the Geolocation API
    // @ts-ignore
    locationWatchId.current = geolocation.watchPosition(handleSuccess, handleError, options);

    // Clear the location watch instance when React unmounts the used component
    return cancelLocationWatch;
  }, [options]);

  return { location, cancelLocationWatch, error };
};

export default useWatchLocation;