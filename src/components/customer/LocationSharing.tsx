
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Map, MapPin, Navigation } from 'lucide-react';

interface LocationSharingProps {
  onLocationShare?: (location: GeolocationCoordinates) => void;
}

const LocationSharing = ({ onLocationShare }: LocationSharingProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isSharing) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          setCurrentLocation(position.coords);
          if (onLocationShare) {
            onLocationShare(position.coords);
          }
        },
        error => {
          console.error('Geolocation error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionDenied(true);
            toast({
              title: "Location access denied",
              description: "Please enable location access to share your location",
              variant: "destructive"
            });
            setIsSharing(false);
          }
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [isSharing, onLocationShare, toast]);

  const handleShareLocation = () => {
    if (!isSharing) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentLocation(position.coords);
          setIsSharing(true);
          toast({
            title: "Location shared",
            description: "Your location is now being shared"
          });
          if (onLocationShare) {
            onLocationShare(position.coords);
          }
        },
        error => {
          console.error('Geolocation error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionDenied(true);
            toast({
              title: "Location access denied",
              description: "Please enable location access to share your location",
              variant: "destructive"
            });
          }
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsSharing(false);
      toast({
        title: "Location sharing stopped",
        description: "Your location is no longer being shared"
      });
    }
  };

  return (
    <div className="app-card p-4 mb-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Location Sharing</h3>
          <Button
            variant={isSharing ? "destructive" : "default"}
            className={isSharing ? "" : "app-button"}
            onClick={handleShareLocation}
            disabled={permissionDenied}
          >
            {isSharing ? (
              <>
                <Navigation className="mr-2 h-4 w-4 animate-pulse" />
                Stop Sharing
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Share Location
              </>
            )}
          </Button>
        </div>

        {permissionDenied && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm mb-4">
            Location permission denied. Please enable location access in your browser settings.
          </div>
        )}

        {currentLocation && (
          <div className="text-sm text-gray-400">
            <div className="flex items-center mb-1">
              <Map className="mr-2 h-4 w-4" />
              <span>Current Location:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-6">
              <span>Latitude:</span>
              <span>{currentLocation.latitude.toFixed(6)}</span>
              <span>Longitude:</span>
              <span>{currentLocation.longitude.toFixed(6)}</span>
              {currentLocation.accuracy && (
                <>
                  <span>Accuracy:</span>
                  <span>{Math.round(currentLocation.accuracy)} meters</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSharing;
