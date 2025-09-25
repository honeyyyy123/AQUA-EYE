import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  AlertTriangle, 
  Waves, 
  Camera, 
  Video, 
  FileText,
  TrendingUp,
  Users,
  Clock,
  Shield
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveMap from './LiveMap';
import QuickReportForm from './QuickReportForm';
import RecentReports from './RecentReports';
import AlertsPanel from './AlertsPanel';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    activeAlerts: 3,
    reportsToday: 24,
    verifiedReports: 18,
    affectedAreas: 5
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'tsunami',
      location: 'Chennai Coast',
      severity: 'high',
      time: '2 min ago',
      verified: true
    },
    {
      id: 2,
      type: 'high-waves',
      location: 'Vizag Harbor',
      severity: 'medium', 
      time: '15 min ago',
      verified: false
    },
    {
      id: 3,
      type: 'storm-surge',
      location: 'Kochi Beach',
      severity: 'high',
      time: '32 min ago',
      verified: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-gradient-alert text-destructive-foreground';
      case 'medium': return 'bg-gradient-wave text-warning-foreground';
      case 'low': return 'bg-gradient-success text-success-foreground';
      default: return 'bg-gradient-ocean text-primary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-3xl font-bold text-destructive">{stats.activeAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reports Today</p>
                  <p className="text-3xl font-bold text-primary">{stats.reportsToday}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified Reports</p>
                  <p className="text-3xl font-bold text-success">{stats.verifiedReports}</p>
                </div>
                <Shield className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Affected Areas</p>
                  <p className="text-3xl font-bold text-warning">{stats.affectedAreas}</p>
                </div>
                <MapPin className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Report */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-primary" />
                    <span>Quick Report</span>
                  </CardTitle>
                  <CardDescription>
                    Report ocean hazards in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickReportForm />
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Recent Alerts</span>
                  </CardTitle>
                  <CardDescription>
                    Latest hazard reports and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-ocean rounded-full">
                            <Waves className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{alert.type.replace('-', ' ')}</p>
                            <p className="text-sm text-muted-foreground flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span>{alert.location}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Map Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Live Hazard Map</span>
                </CardTitle>
                <CardDescription>
                  Real-time visualization of reported ocean hazards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <LiveMap height="24rem" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <LiveMap height="calc(100vh - 200px)" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <RecentReports />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;