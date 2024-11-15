import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const Map = ({ setSelectedLocation, selectedLocation, setValue }) => {

  // Update latitude and longitude when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setValue("latitude", selectedLocation.lat);
      setValue("longitude", selectedLocation.lng);
    }
  }, [selectedLocation, setValue]);

  useEffect(() => {
    // Initialize the map
    const map = L.map("map", {
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true,
    }).setView([28.6139, 77.2090], 13); // Default view

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Create and manage marker
    let marker = null;

    map.on("click", (e) => {
      const latlng = e.latlng;
      setSelectedLocation(latlng); // Update selectedLocation

      if (marker) marker.remove(); // Remove previous marker if exists
      marker = L.marker(latlng).addTo(map); // Add new marker at clicked location
    });

    return () => {
      map.remove(); // Cleanup map on component unmount
    };
  }, [setSelectedLocation]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <div id="map" style={{ height: "100%" }}></div>

    </div>
  );
};

export default Map;
