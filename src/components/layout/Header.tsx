import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Waves, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  AlertTriangle,
  Shield,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  user?: {
    name: string;
    role: 'citizen' | 'official' | 'analyst';
    avatar?: string;
  };
  alertCount?: number;
}

const Header = ({ user, alertCount = 0 }: HeaderProps) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'official': return <Shield className="h-4 w-4" />;
      case 'analyst': return <Users className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'official': return 'bg-gradient-alert text-warning-foreground';
      case 'analyst': return 'bg-gradient-success text-success-foreground';
      default: return 'bg-gradient-ocean text-primary-foreground';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-ocean p-2 rounded-lg">
              <Waves className="h-6 w-6 text-primary-foreground animate-wave" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">AQUA-EYE</h1>
              <p className="text-xs text-muted-foreground">Ocean Hazard Monitoring</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" size="sm">Dashboard</Button>
          <Button variant="ghost" size="sm">Report Hazard</Button>
          <Button variant="ghost" size="sm">Live Map</Button>
          <Button variant="ghost" size="sm">Alerts</Button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {alertCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {alertCount > 99 ? '99+' : alertCount}
              </Badge>
            )}
          </Button>

          {/* Emergency Alert Button */}
          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-ocean text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{user.name}</span>
                      <Badge className={`text-xs ${getRoleBadgeVariant(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1 capitalize">{user.role}</span>
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;