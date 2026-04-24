import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import getIcon from "../../utils/getIcon";
import { open } from "../../redux/slices/detailSlice";
import AirportMarker from "../../components/marker/airport-marker";
import { useEffect } from "react";
import { getFlights } from "../../redux/actions";

const Map = () => {
  const { flights } = useSelector((store) => store.flights);
  const { isLoading, info, route } = useSelector((store) => store.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => dispatch(getFlights()), 5000);

    //kullanıcı sayfadan ayrıldığında sayacı durdur
    return () => clearInterval(id);
  }, []);

  return (
    <MapContainer
      center={[38.960621, 35.452065]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Uçağın Rotası */}
      {!isLoading && route && route.length > 0 && (
        <Polyline positions={route} pathOptions={{ color: "red" }} />
      )}

      {/* Kalkış noktasını işaretle */}
      {!isLoading &&
        info?.airport?.origin?.position?.latitude != null &&
        info?.airport?.origin?.position?.longitude != null && (
          <AirportMarker info={info.airport.origin} title="Kalkış " />
        )}

      {/* İniş noktasını işaretle */}
      {!isLoading &&
        info?.airport?.destination?.position?.latitude != null &&
        info?.airport?.destination?.position?.longitude != null && (
          <AirportMarker info={info.airport.destination} title="İniş " />
        )}

      {flights.map((flight, id) => (
        <Marker
          icon={getIcon(
            flight.direction,
            flight?.flightId === info?.identification?.id,
            info?.identification?.id
          )}
          key={id}
          position={[flight.lat, flight.long]}
        >
          <Popup>
            <div className="popup">
              <span>{flight.callsign}</span>
              <button onClick={() => dispatch(open(flight.flightId))}>
                Detay
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
