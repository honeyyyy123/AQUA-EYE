import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Filter, 
  MapPin, 
  Clock, 
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Camera,
  Video,
  FileText,
  User,
  Calendar
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RecentReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterHazard, setFilterHazard] = useState('all');

  // Mock reports data
  const reports = [
    {
      id: 'RPT-2024-001',
      title: 'High Tsunami Warning - Chennai Marina',
      hazardType: 'tsunami',
      severity: 'high',
      status: 'verified',
      location: 'Chennai Marina Beach, Tamil Nadu',
      reporter: {
        name: 'Rajesh Kumar',
        role: 'citizen',
        avatar: null
      },
      timestamp: '2024-09-25T10:30:00Z',
      description: 'Observed unusual wave patterns and rapid water recession. Local fishing boats being pulled out to sea.',
      media: {
        images: 3,
        videos: 1,
        documents: 0
      },
      coordinates: { lat: 13.0827, lng: 80.2707 },
      verifiedBy: 'Dr. Priya Sharma, INCOIS',
      impactRadius: '5km',
      affectedPopulation: 15000
    },
    {
      id: 'RPT-2024-002',
      title: 'Storm Surge - Kochi Backwaters',
      hazardType: 'storm-surge',
      severity: 'medium',
      status: 'under-review',
      location: 'Kochi Backwaters, Kerala',
      reporter: {
        name: 'Marina Jose',
        role: 'official',
        avatar: null
      },
      timestamp: '2024-09-25T09:15:00Z',
      description: 'Rising water levels in backwater areas. Local communities reporting flooding in low-lying areas.',
      media: {
        images: 5,
        videos: 2,
        documents: 1
      },
      coordinates: { lat: 9.9312, lng: 76.2673 },
      verifiedBy: null,
      impactRadius: '3km',
      affectedPopulation: 8000
    },
    {
      id: 'RPT-2024-003',
      title: 'Abnormal High Waves - Vizag Harbor',
      hazardType: 'high-waves',
      severity: 'low',
      status: 'rejected',
      location: 'Visakhapatnam Harbor, Andhra Pradesh',
      reporter: {
        name: 'Suresh Rao',
        role: 'citizen',
        avatar: null
      },
      timestamp: '2024-09-25T08:45:00Z',
      description: 'Noticed higher than usual waves at the harbor. Fishing operations temporarily halted.',
      media: {
        images: 2,
        videos: 0,
        documents: 0
      },
      coordinates: { lat: 17.7231, lng: 83.3950 },
      verifiedBy: 'Analysis Team',
      impactRadius: '1km',
      affectedPopulation: 500
    },
    {
      id: 'RPT-2024-004',
      title: 'Coastal Flooding Alert - Goa Beaches',
      hazardType: 'coastal-flooding',
      severity: 'medium',
      status: 'pending',
      location: 'Multiple Beaches, Goa',
      reporter: {
        name: 'Ana Fernandes',
        role: 'analyst',
        avatar: null
      },
      timestamp: '2024-09-25T07:20:00Z',
      description: 'Multiple reports of beach erosion and water intrusion into coastal properties.',
      media: {
        images: 8,
        videos: 3,
        documents: 2
      },
      coordinates: { lat: 15.2993, lng: 74.1240 },
      verifiedBy: null,
      impactRadius: '10km',
      affectedPopulation: 25000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-gradient-success text-success-foreground';
      case 'under-review': return 'bg-gradient-wave text-warning-foreground';
      case 'pending': return 'bg-gradient-ocean text-primary-foreground';
      case 'rejected': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-gradient-alert text-destructive-foreground';
      case 'medium': return 'bg-gradient-wave text-warning-foreground';
      case 'low': return 'bg-gradient-success text-success-foreground';
      default: return 'bg-gradient-ocean text-primary-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'official': return 'text-warning';
      case 'analyst': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'under-review': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reporter.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesHazard = filterHazard === 'all' || report.hazardType === filterHazard;
    
    return matchesSearch && matchesStatus && matchesHazard;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
          <CardDescription>
            Search, filter, and manage hazard reports from citizens and officials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports, locations, or reporters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterHazard} onValueChange={setFilterHazard}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by hazard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hazards</SelectItem>
                <SelectItem value="tsunami">Tsunami</SelectItem>
                <SelectItem value="storm-surge">Storm Surge</SelectItem>
                <SelectItem value="high-waves">High Waves</SelectItem>
                <SelectItem value="coastal-flooding">Coastal Flooding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-wave transition-all duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{report.title}</h3>
                      <Badge className={getSeverityColor(report.severity)}>
                        {report.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {report.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(report.status)}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{report.status.replace('-', ' ')}</span>
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={report.reporter.avatar} />
                    <AvatarFallback className="bg-gradient-ocean text-primary-foreground text-xs">
                      {report.reporter.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{report.reporter.name}</p>
                    <p className={`text-xs capitalize ${getRoleColor(report.reporter.role)}`}>
                      {report.reporter.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatTimestamp(report.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">
                  {report.description}
                </p>

                {/* Media and Impact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-accent/20 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Media Attachments</p>
                    <div className="flex space-x-3">
                      {report.media.images > 0 && (
                        <span className="flex items-center text-xs">
                          <Camera className="h-3 w-3 mr-1 text-primary" />
                          {report.media.images}
                        </span>
                      )}
                      {report.media.videos > 0 && (
                        <span className="flex items-center text-xs">
                          <Video className="h-3 w-3 mr-1 text-primary" />
                          {report.media.videos}
                        </span>
                      )}
                      {report.media.documents > 0 && (
                        <span className="flex items-center text-xs">
                          <FileText className="h-3 w-3 mr-1 text-primary" />
                          {report.media.documents}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Impact Radius</p>
                    <p className="text-sm font-medium">{report.impactRadius}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Affected Population</p>
                    <p className="text-sm font-medium">{report.affectedPopulation.toLocaleString()}</p>
                  </div>
                </div>

                {/* Verification Info */}
                {report.verifiedBy && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">
                        Verified by <strong>{report.verifiedBy}</strong>
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ID: {report.id}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reports found</h3>
            <p className="text-muted-foreground">
              No reports match your current search and filter criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecentReports;