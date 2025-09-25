import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Bell, 
  BellRing,
  Clock,
  MapPin,
  Users,
  Zap,
  Volume2,
  Share2,
  CheckCircle,
  X,
  Settings
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AlertsPanel = () => {
  const [alertSettings, setAlertSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    whatsappAlerts: true,
    soundAlerts: true
  });

  // Mock active alerts data
  const activeAlerts = [
    {
      id: 'ALT-001',
      type: 'tsunami',
      title: 'TSUNAMI WARNING - IMMEDIATE EVACUATION',
      location: 'Chennai Coastal Areas',
      severity: 'critical',
      issuedAt: '2024-09-25T10:30:00Z',
      expiresAt: '2024-09-25T16:30:00Z',
      affectedAreas: ['Marina Beach', 'Besant Nagar', 'Thiruvanmiyur'],
      estimatedAffected: 150000,
      status: 'active',
      authority: 'INCOIS Emergency Response',
      instructions: 'Move to higher ground immediately. Avoid coastal areas. Follow local authorities instructions.',
      confirmationRequired: true
    },
    {
      id: 'ALT-002',
      type: 'high-waves',
      title: 'HIGH WAVE ADVISORY',
      location: 'Goa Beaches',
      severity: 'medium',
      issuedAt: '2024-09-25T09:15:00Z',
      expiresAt: '2024-09-25T18:00:00Z',
      affectedAreas: ['Calangute', 'Baga', 'Anjuna'],
      estimatedAffected: 25000,
      status: 'active',
      authority: 'Goa Maritime Safety',
      instructions: 'Avoid swimming and water sports. Stay away from rocky coastlines.',
      confirmationRequired: false
    }
  ];

  const pastAlerts = [
    {
      id: 'ALT-003',
      type: 'storm-surge',
      title: 'Storm Surge Warning',
      location: 'Kochi Backwaters',
      severity: 'high',
      issuedAt: '2024-09-24T14:20:00Z',
      resolvedAt: '2024-09-24T22:30:00Z',
      status: 'resolved',
      authority: 'Kerala Disaster Management'
    },
    {
      id: 'ALT-004',
      type: 'coastal-flooding',
      title: 'Coastal Flooding Alert',
      location: 'Mumbai Coastal Areas',
      severity: 'medium',
      issuedAt: '2024-09-23T11:45:00Z',
      resolvedAt: '2024-09-23T18:00:00Z',
      status: 'resolved',
      authority: 'Mumbai Municipal Corporation'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-gradient-alert text-destructive-foreground animate-pulse';
      case 'high': return 'bg-gradient-alert text-destructive-foreground';
      case 'medium': return 'bg-gradient-wave text-warning-foreground';
      case 'low': return 'bg-gradient-success text-success-foreground';
      default: return 'bg-gradient-ocean text-primary-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <Zap className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  const handleAlertAction = (alertId: string, action: 'acknowledge' | 'dismiss' | 'share') => {
    console.log(`Alert ${alertId}: ${action}`);
    // Implementation would handle the specific action
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="relative">
            Active Alerts
            {activeAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {activeAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
                <p className="text-muted-foreground">
                  There are currently no active hazard alerts for your area.
                </p>
              </CardContent>
            </Card>
          ) : (
            activeAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.severity === 'critical' ? 'border-l-destructive shadow-emergency' : 
                alert.severity === 'high' ? 'border-l-destructive' : 'border-l-warning'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {getSeverityIcon(alert.severity)}
                          <span className="ml-1">{alert.severity.toUpperCase()}</span>
                        </Badge>
                        {alert.confirmationRequired && (
                          <Badge variant="outline" className="border-warning text-warning">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{alert.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {alert.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTimeRemaining(alert.expiresAt)}
                        </span>
                      </CardDescription>
                    </div>
                    
                    <div className="flex space-x-2">
                      {alert.severity === 'critical' && (
                        <Button size="icon" variant="outline" className="border-destructive text-destructive animate-pulse">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="icon" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Alert Instructions */}
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Emergency Instructions:</h4>
                    <p className="text-sm">{alert.instructions}</p>
                  </div>

                  {/* Affected Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Affected Areas</h4>
                      <div className="space-y-1">
                        {alert.affectedAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Est. Affected Population</h4>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-warning" />
                        <span className="font-semibold">{alert.estimatedAffected.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Issued By</h4>
                      <p className="text-sm font-medium">{alert.authority}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.issuedAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                    {alert.confirmationRequired && (
                      <Button 
                        className="bg-gradient-success hover:opacity-90"
                        onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        I'm Safe / Acknowledge
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={() => handleAlertAction(alert.id, 'share')}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Alert
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAlertAction(alert.id, 'dismiss')}
                      className="ml-auto"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alert History</CardTitle>
              <CardDescription>
                Previously resolved alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {alert.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.authority}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline" className="text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.resolvedAt!).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Alert Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how you receive hazard alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(alertSettings).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {key === 'pushNotifications' && 'Receive instant push notifications on your device'}
                      {key === 'emailAlerts' && 'Get alerts delivered to your email inbox'}
                      {key === 'smsAlerts' && 'Receive SMS text messages for critical alerts'}
                      {key === 'whatsappAlerts' && 'Get notifications via WhatsApp messenger'}
                      {key === 'soundAlerts' && 'Play alert sounds for emergency notifications'}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => setAlertSettings({
                      ...alertSettings,
                      [key]: checked
                    })}
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Button className="bg-gradient-ocean hover:opacity-90">
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPanel;