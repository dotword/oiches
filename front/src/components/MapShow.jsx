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
        map.setView(position, 15);
    }, [position, map]);

    return null;
};

const MapShow = ({ direccion }) => {
    const { VITE_LEAFLET_APIKEY } = import.meta.env;

    const [position, setPosition] = useState([40.463667, -3.74922]);
    const [formattedAddress, setFormattedAddress] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                        direccion
                    )}&key=${VITE_LEAFLET_APIKEY}`
                );
                const data = await response.json();
                const formattedComponents = data.results[0].components;
                console.log('data ', formattedComponents);

                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry;
                    setPosition([lat, lng]);
                    setFormattedAddress(
                        `${formattedComponents.neighbourhood}, ${formattedComponents.house_number}, ${formattedComponents.city}, ${formattedComponents.state}`
                    );
                } else {
                    setError('No se encontraron resultados para la dirección.');
                }
            } catch (err) {
                setError('Error al obtener la ubicación.');
            }
        };

        fetchCoordinates();
    }, [direccion, VITE_LEAFLET_APIKEY]);
    console.log(formattedAddress);

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
                    <Popup>{direccion}</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapShow;
