import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ position, setPosition }) => {
  const handleMarkerDrag = (e) => {
    setPosition(e.target.getLatLng());
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "250px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{ dragend: handleMarkerDrag }}
      />
    </MapContainer>
  );
};

export default LeafletMap;
