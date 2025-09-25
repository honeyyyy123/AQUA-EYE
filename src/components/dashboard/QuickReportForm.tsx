import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Camera, 
  Video, 
  FileText, 
  MapPin, 
  Upload,
  AlertTriangle,
  Waves,
  Wind,
  Droplets
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const QuickReportForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    hazardType: '',
    description: '',
    severity: '',
    files: [] as File[]
  });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const hazardTypes = [
    { value: 'tsunami', label: 'Tsunami Warning', icon: Waves, color: 'text-destructive' },
    { value: 'high-waves', label: 'High Waves', icon: Waves, color: 'text-warning' },
    { value: 'storm-surge', label: 'Storm Surge', icon: Wind, color: 'text-destructive' },
    { value: 'coastal-flooding', label: 'Coastal Flooding', icon: Droplets, color: 'text-warning' },
    { value: 'abnormal-tide', label: 'Abnormal Tide', icon: Waves, color: 'text-primary' },
    { value: 'rip-current', label: 'Rip Current', icon: Waves, color: 'text-warning' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'text-success' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'high', label: 'High', color: 'text-destructive' },
    { value: 'critical', label: 'Critical', color: 'text-destructive' }
  ];

  const handleLocationCapture = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location captured",
            description: "Your current location has been recorded with the report.",
          });
        },
        (error) => {
          toast({
            title: "Location error", 
            description: "Unable to capture location. Please ensure location services are enabled.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData({ ...formData, files: [...formData.files, ...files] });
    
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) added to your report.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.hazardType || !formData.description || !formData.severity) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would submit to the backend
    console.log('Report submitted:', { 
      ...formData, 
      location,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Report submitted successfully",
      description: "Your hazard report has been submitted and is being processed by our team.",
    });

    // Reset form
    setFormData({
      hazardType: '',
      description: '',
      severity: '',
      files: []
    });
    setLocation(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hazard Type Selection */}
      <div className="space-y-2">
        <Label htmlFor="hazardType" className="text-sm font-medium">
          Hazard Type *
        </Label>
        <Select 
          value={formData.hazardType} 
          onValueChange={(value) => setFormData({...formData, hazardType: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hazard type" />
          </SelectTrigger>
          <SelectContent>
            {hazardTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center space-x-2">
                  <type.icon className={`h-4 w-4 ${type.color}`} />
                  <span>{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Severity Level */}
      <div className="space-y-2">
        <Label htmlFor="severity" className="text-sm font-medium">
          Severity Level *
        </Label>
        <Select 
          value={formData.severity} 
          onValueChange={(value) => setFormData({...formData, severity: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            {severityLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-4 w-4 ${level.color}`} />
                  <span>{level.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what you observed... (e.g., wave height, water level, damage, etc.)"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Location Capture */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Location</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleLocationCapture}
          className={location ? "border-success text-success" : ""}
        >
          <MapPin className="h-4 w-4 mr-2" />
          {location ? "Location Captured" : "Capture Location"}
        </Button>
        {location && (
          <p className="text-xs text-muted-foreground">
            Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
          </p>
        )}
      </div>

      {/* Media Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Attach Media (Optional)</Label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => document.getElementById('imageUpload')?.click()}
              className="w-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => document.getElementById('videoUpload')?.click()}
              className="w-full"
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <input
              type="file"
              id="documentUpload"
              accept=".pdf,.doc,.docx,.txt"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => document.getElementById('documentUpload')?.click()}
              className="w-full"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {formData.files.length > 0 && (
          <div className="space-y-1">
            {formData.files.map((file, index) => (
              <p key={index} className="text-xs text-muted-foreground flex items-center">
                <Upload className="h-3 w-3 mr-1" />
                {file.name}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-gradient-ocean hover:opacity-90"
        size="lg"
      >
        <AlertTriangle className="h-4 w-4 mr-2" />
        Submit Report
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        Your report will be reviewed and verified by our team
      </p>
    </form>
  );
};

export default QuickReportForm;