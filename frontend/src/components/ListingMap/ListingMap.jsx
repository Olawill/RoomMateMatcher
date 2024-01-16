import { useEffect, useState, useRef } from 'react';
import PageLayout from '../PageLayout/PageLayout';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];
  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
  };

  const center = {
    lat: 49.76773,
    lng: -96.8097,
  };

const MapComponent = ({ listings }) => {
  const navigate = useNavigate();

  const [pins, setPins] = useState([]);

  const [activePin, setActivePin] = useState(null);

  const api_key = import.meta.env.VITE_GOOGLE_MAPS_API;

  const mapRef = useRef(null);
  const overlayRef = useRef(null);


  const onLoad = (map) => {
    mapRef.current = map;
    overlayRef.current = new window.google.maps.OverlayView();
    overlayRef.current.onAdd = () => {};
    overlayRef.current.draw = () => {};
    overlayRef.current.onRemove = () => {};
    overlayRef.current.setMap(map);
  };

  const onUnmount = () => {
    overlayRef.current.setMap(null);
  };

  const updateTooltipPosition = () => {
    if (overlayRef.current && activePin) {
      const projection = overlayRef.current.getProjection();
      const markerLatLng = new window.google.maps.LatLng(activePin.lat, activePin.lng);
      const markerPixel = projection.fromLatLngToContainerPixel(markerLatLng);

      const tooltip = document.getElementById('custom-tooltip');

      if (tooltip) {
        tooltip.style.left = `${markerPixel.x}px`;
        tooltip.style.top = `${markerPixel.y}px`;
      }
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const pinsData = await Promise.allSettled(
        listings.map(async (listing) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${listing.postal_code}&key=${api_key}`
            );
            const data = await response.json();

            if (data.results.length > 0) {
              const { lat, lng } = data.results[0].geometry.location;
              return { ...listing, lat, lng, error: null };
            } else {
              console.error(`No results found for ${listing.postal_code}`);
              return {...listing, error: `No results found for ${listing.postal_code}`};
            }
          } catch (error) {
            console.error(`Error geocoding ${listing.postal_code}:`, error);
            return {...listing, error: `Error geocoding ${listing.postal_code}: ${error.message}`};
          }
        })
      );

      // Extract all successful request
      // console.log(pinsData);
      const successfulPins = pinsData.filter(result => {
        return result.status === "fulfilled" && !result.value.error;
      }).map(result => result.value);

      setPins(successfulPins);
    };

    fetchData();
  }, [listings]);

  useEffect(() => {
    updateTooltipPosition();
  }, [activePin]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_key,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <PageLayout>
        {({ theme }) => (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </PageLayout>
    );
  }

  return (
    <PageLayout requireAuthentication={true}>
    {({ theme }) => (

    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {
          pins.map(pin => (
            <Marker
              key={`${pin.lat}-${pin.long}`}
              position={{lat: pin.lat, lng: pin.lng}}
              onClick={() => navigate(`/${pin.id}`)}
              onMouseOver={() => {
                setActivePin(pin);
              }}
              // onTouchStart={()=> setActivePin(pin)}
              onMouseOut={() => {
                setActivePin(null)
              }}
            >
            </Marker>
          ))
        }
        {
          activePin && (
          <Card
            id="custom-tooltip"
            bg={theme.toLowerCase()}
            border="info"
            style={{
              width: '18rem',
              position: 'absolute',
              backgroundColor: "white",
              padding: "8px",
              borderRadius: '8px',
              boxShadow: `0 8px 16px 0 rgba(0, 0, 0, 0.1)`,
              zIndex: '9999',
            }}
          >
            <Card.Img variant="top" src={activePin.image_url} />
            <Card.Body>
              <Card.Title>{activePin.title}</Card.Title>
              <Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item variant={theme.toLowerCase()}><strong>Price: </strong> ${activePin.price}/month</ListGroup.Item>
                  <ListGroup.Item variant={theme.toLowerCase()}>{activePin.postal_code}</ListGroup.Item>
                </ListGroup>
              </Card.Text>
              <Button variant="primary">Click to View Listing</Button>
            </Card.Body>
          </Card>
          )
        }
      </GoogleMap>
    </div>

    )}
    </PageLayout>
  );
};

export default MapComponent;
