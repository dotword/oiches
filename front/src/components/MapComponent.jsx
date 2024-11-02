import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const SetMapView = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);
    }, [position, map]);

    return null;
};

const MapComponent = ({ wholeAddress }) => {
    const { VITE_LEAFLET_APIKEY } = import.meta.env;

    const [position, setPosition] = useState([40.463667, -3.74922]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCoordinates = async () => {
            // const leafletApiKey = 'c77ef10bb94940318ca3502e8587633a';
            try {
                const response = await fetch(
                    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                        wholeAddress
                    )}&key=${VITE_LEAFLET_APIKEY}`
                );
                const data = await response.json();

                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry;
                    setPosition([lat, lng]);
                } else {
                    setError('No se encontraron resultados para la dirección.');
                }
            } catch (err) {
                setError('Error al obtener la ubicación.');
            }
        };

        fetchCoordinates();
    }, [wholeAddress, VITE_LEAFLET_APIKEY]);

    return (
        <>
            {error && <p>{error}</p>}
            <MapContainer
                center={position}
                zoom={20}
                style={{ height: '300px', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <SetMapView position={position} />
                <Marker position={position}>
                    <Popup>{wholeAddress}</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapComponent;
