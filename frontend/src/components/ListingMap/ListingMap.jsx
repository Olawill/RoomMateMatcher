import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PageLayout from '../PageLayout/PageLayout';


const MapComponent = ({ listings }) => {

  const [pins, setPins] = useState([]);

  const [showPop, setShowPop] = useState(false);

  const api_key = "AIzaSyBmYS3NAr4KZ4KPKTp5Y1B109bLHdrEaVU";

  useEffect(() => {
    const fetchData = async () => {
      const pinsData = await Promise.all(
        listings.map(async (listing) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${listing.postal_code}&key=${api_key}`
            );
            const data = await response.json();

            if (data.results.length > 0) {
              const { lat, lng } = data.results[0].geometry.location;
              return { ...listing, lat, lng };
            } else {
              console.error(`No results found for ${listing.postal_code}`);
              return null;
            }
          } catch (error) {
            console.error(`Error geocoding ${listing.postal_code}:`, error);
            return null;
          }
        })
      );

      setPins(pinsData.filter(pin => pin !== null));
    };

    fetchData();
  }, [listings]);

  return (
    <PageLayout>
    {({ theme, getThemeAuto }) => (
      <MapContainer
      center={[49.76773, -96.8097]}
      zoom={2}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin) => (
        <Marker
          key={`${pin.lat}-${pin.long}`}
          position={[pin.lat, pin.lng]}
          eventHandlers={
            {
              mouseover: () => setShowPop(true),
              mouseout: () => setShowPop(false),
              click: () => {
                console.log('marker clicked')
              }
            }
          }
        >
          {showPop && (
            <Popup>
              <b>{pin.title}</b> at <b>{pin.postal_code}</b> for ${pin.price}/month
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>

    )}
    </PageLayout>
  );
};

export default MapComponent;
