import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const LeafletMap = ({ position, setPosition, canDrag }) => {
  const [draggable, setDraggable] = useState(canDrag);

  const handleMarkerDrag = (e) => {
    setPosition(e.target.getLatLng());
  };

  useEffect(() => {
    setDraggable(canDrag);
  }, [canDrag]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "250px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        draggable={draggable}
        eventHandlers={{ dragend: handleMarkerDrag }}
      />
    </MapContainer>
  );
};

export default LeafletMap;
