import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search,
  AlertTriangle,
  Waves,
  Navigation,
  ZoomIn,
  RotateCcw
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LiveMapProps {
  height?: string;
}

const LiveMap = ({ height = '400px' }: LiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapFilters, setMapFilters] = useState({
    tsunami: true,
    stormSurge: true,
    highWaves: true,
    coastalFlooding: true
  });

  // Mock hazard data points
  const hazardPoints = [
    { id: 1, lat: 13.0827, lng: 80.2707, type: 'tsunami', severity: 'high', location: 'Chennai Marina Beach', reports: 15 },
    { id: 2, lat: 17.7231, lng: 83.3950, type: 'high-waves', severity: 'medium', location: 'Vizag RK Beach', reports: 8 },
    { id: 3, lat: 9.9312, lng: 76.2673, type: 'storm-surge', severity: 'high', location: 'Kochi Backwaters', reports: 12 },
    { id: 4, lat: 11.9416, lng: 79.8083, type: 'coastal-flooding', severity: 'low', location: 'Pondicherry Beach', reports: 4 },
    { id: 5, lat: 15.2993, lng: 74.1240, type: 'high-waves', severity: 'medium', location: 'Goa Beaches', reports: 6 }
  ];

  const getHazardColor = (type: string, severity: string) => {
    const colors = {
      'tsunami': severity === 'high' ? '#ef4444' : severity === 'medium' ? '#f97316' : '#84cc16',
      'high-waves': severity === 'high' ? '#dc2626' : severity === 'medium' ? '#ea580c' : '#65a30d',
      'storm-surge': severity === 'high' ? '#b91c1c' : severity === 'medium' ? '#c2410c' : '#4d7c0f',
      'coastal-flooding': severity === 'high' ? '#991b1b' : severity === 'medium' ? '#9a3412' : '#365314'
    };
    return colors[type as keyof typeof colors] || '#3b82f6';
  };

  const getSeveritySize = (severity: string) => {
    switch (severity) {
      case 'high': return 20;
      case 'medium': return 16;
      case 'low': return 12;
      default: return 16;
    }
  };

  useEffect(() => {
    // In a real implementation, this would initialize an actual map
    // using libraries like Mapbox GL JS, Leaflet, or Google Maps
    console.log('Map initialized with hazard points:', hazardPoints);
  }, []);

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Card className="shadow-wave">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search location..." 
                className="w-48"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-wave">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Hazard Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {Object.entries(mapFilters).map(([key, enabled]) => (
              <label key={key} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setMapFilters({
                    ...mapFilters,
                    [key]: e.target.checked
                  })}
                  className="text-primary"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Map Navigation Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="flex flex-col space-y-1">
          <Button size="icon" variant="outline" className="bg-background/90">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="bg-background/90">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="bg-background/90">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="bg-background/90">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Map Area - Mock Indian Coastline */}
      <div 
        className="w-full h-full bg-gradient-to-b from-accent/20 to-primary/10 rounded-lg border relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, hsl(var(--accent) / 0.15) 0%, transparent 50%),
            linear-gradient(45deg, hsl(var(--background)) 25%, transparent 25%), 
            linear-gradient(-45deg, hsl(var(--background)) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, hsl(var(--background)) 75%), 
            linear-gradient(-45deg, transparent 75%, hsl(var(--background)) 75%)
          `,
          backgroundSize: '60px 60px, 80px 80px, 20px 20px, 20px 20px, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 20px 30px, 0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      >
        {/* Indian Coastline Representation */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="water" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="hsl(var(--primary) / 0.1)" />
              <path d="M0,4 l4,-4 M-1,1 l2,-2 M3,5 l2,-2" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          
          {/* Simplified Indian coastline */}
          <path
            d="M100 50 Q200 80 300 60 Q400 40 500 70 Q600 100 700 90 Q800 70 850 100 Q900 130 950 120"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            className="drop-shadow-sm"
          />
          
          {/* Water areas */}
          <rect x="0" y="0" width="100%" height="100%" fill="url(#water)" opacity="0.3" />
        </svg>

        {/* Hazard Points */}
        {hazardPoints.map((point) => (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${(point.lng - 68) * 8}%`, // Approximate mapping for Indian ocean
              top: `${(28 - point.lat) * 4}%`,
            }}
            onClick={() => setSelectedLocation(point.location)}
          >
            {/* Pulsing animation for high severity */}
            {point.severity === 'high' && (
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: getHazardColor(point.type, point.severity),
                  width: getSeveritySize(point.severity),
                  height: getSeveritySize(point.severity),
                }}
              />
            )}
            
            {/* Main hazard marker */}
            <div 
              className="rounded-full border-2 border-background shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: getHazardColor(point.type, point.severity),
                width: getSeveritySize(point.severity),
                height: getSeveritySize(point.severity),
              }}
            >
              <Waves className="h-3 w-3 text-white" />
            </div>

            {/* Tooltip */}
            {selectedLocation === point.location && (
              <Card className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 shadow-wave">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${
                        point.severity === 'high' ? 'bg-gradient-alert' :
                        point.severity === 'medium' ? 'bg-gradient-wave' : 'bg-gradient-success'
                      }`}>
                        {point.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{point.reports} reports</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">{point.type.replace('-', ' ')}</p>
                      <p className="text-xs text-muted-foreground">{point.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        {/* Legend */}
        <Card className="absolute bottom-4 left-4 shadow-wave">
          <CardContent className="p-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Hazard Severity</p>
              <div className="flex space-x-4">
                {['high', 'medium', 'low'].map((severity) => (
                  <div key={severity} className="flex items-center space-x-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getHazardColor('tsunami', severity) }}
                    />
                    <span className="text-xs capitalize">{severity}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Reports Counter */}
        <Card className="absolute bottom-4 right-4 shadow-wave">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">
                {hazardPoints.reduce((sum, point) => sum + point.reports, 0)} Active Reports
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMap;