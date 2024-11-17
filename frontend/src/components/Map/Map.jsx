import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const Map = ({ setSelectedLocation, selectedLocation, searchedLocation, setValue }) => {
  useEffect(() => {
    if (selectedLocation) {
      setValue("latitude", selectedLocation.lat);
      setValue("longitude", selectedLocation.lng);
    }
  }, [selectedLocation, setValue]);

  useEffect(() => {
    const map = L.map("map", {
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true,
    }).setView([28.6139, 77.2090], 13); // Default: Delhi

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    let marker = null;

    map.on("click", (e) => {
      const latlng = e.latlng;
      setSelectedLocation(latlng);

      if (marker) marker.remove();
      marker = L.marker(latlng).addTo(map);
    });

    if (searchedLocation) {
      const { lat, lng } = searchedLocation;
      map.setView([lat, lng], 13); // Center map on searched location
      if (marker) marker.remove();
      marker = L.marker([lat, lng]).addTo(map);
      setSelectedLocation(searchedLocation);
    }

    return () => {
      map.remove();
    };
  }, [setSelectedLocation, searchedLocation]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default Map;
