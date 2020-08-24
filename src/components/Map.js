import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const MapContainer = () => {
  let { deliveries, loading, mapCenter, mapZoom } = useContext(GlobalContext);

  return loading ? (
    "Carregando..."
  ) : (
    <Map
      center={mapCenter}
      zoom={mapZoom}
      style={{ width: "100%", height: "300px", borderRadius: "7px" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {deliveries.map((delivery) => {
        const point = [
          delivery.address.geolocation.latitude,
          delivery.address.geolocation.longitude,
        ];

        return (
          <Marker position={point} key={delivery._id}>
            <Popup>
              <span>{delivery.client}</span>
              <br />
              <span>{delivery.weight}</span>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};

export default MapContainer;
