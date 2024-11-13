import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, 13);
    return null;
}

const MapComponent = ({ onLocationSelect }) => {
    const [address, setAddress] = useState('');
    const [foundAddress, setFoundAddress] = useState('');
    const [location, setLocation] = useState({ lat: 40.463667, lng: -3.74922 });
    const [debouncedAddress, setDebouncedAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Debounce: Retrasar la búsqueda para evitar demasiadas solicitudes rápidas
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedAddress(address);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [address]);

    // Realizar la búsqueda después de que la dirección haya cambiado
    useEffect(() => {
        if (debouncedAddress) {
            fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${debouncedAddress}&countrycodes=ES&addressdetails=1`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.length > 0) {
                        setSuggestions(data); // Almacenar las sugerencias
                    } else {
                        setSuggestions([]); // Si no hay resultados, limpiar las sugerencias
                    }
                })
                .catch((error) =>
                    console.error('Error buscando la dirección:', error)
                );
        }
    }, [debouncedAddress]);

    const handleSuggestionClick = (suggestion) => {
        const { lat, lon, display_name, address } = suggestion;
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setFoundAddress(display_name);

        // Llamar la función onLocationSelect con los datos seleccionados
        onLocationSelect({
            direccion: [
                address?.road || '',
                address?.house_number || '',
                address?.village || address?.town || address?.city || '',
            ]
                .filter(Boolean)
                .join(', '),
            ciudad:
                address?.village ||
                address?.village ||
                address?.town ||
                address?.city ||
                '',
            lat: parseFloat(lat),
            lon: parseFloat(lon),
        });
        setAddress(display_name); // Actualizar el campo de dirección con la sugerencia seleccionada
        setSuggestions([]); // Limpiar las sugerencias después de seleccionar
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar dirección..."
                value={address || ''}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input mb-2"
            />

            {/* Mostrar sugerencias debajo del campo de texto */}
            {suggestions.length > 0 && (
                <ul className="my-2">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-1 cursor-pointer text-neutral-500 hover:text-black"
                            onClick={() => handleSuggestionClick(suggestion)} // Llamar cuando se hace clic
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}

            <MapContainer
                center={[location.lat, location.lng]}
                zoom={13}
                style={{ height: '200px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.lat, location.lng]}>
                    <Popup>
                        {foundAddress
                            ? `${foundAddress} )`
                            : 'Ubicación seleccionada'}
                    </Popup>
                </Marker>
                <ChangeMapView coords={[location.lat, location.lng]} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
