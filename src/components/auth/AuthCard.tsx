import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Waves, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

type AuthMode = 'signin' | 'signup';

const AuthCard = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    locationAccess: 'permanent' as 'permanent' | 'app-only' | 'denied'
  });

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    // Implementation would integrate with actual auth providers
  };

  const handlePhoneAuth = () => {
    console.log('Phone authentication');
    // Implementation for phone OTP
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Implementation for form submission
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-ocean">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-ocean p-3 rounded-full">
            <Waves className="h-8 w-8 text-primary-foreground animate-wave" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-primary">
          AQUA-EYE
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Ocean Hazard Reporting Platform - INCOIS
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Social Authentication */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-12 font-medium"
            onClick={() => handleSocialAuth('google')}
          >
            <FcGoogle className="mr-3 h-5 w-5" />
            Continue with Google
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSocialAuth('facebook')}
            >
              <Facebook className="h-4 w-4 text-blue-600" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSocialAuth('twitter')}
            >
              <Twitter className="h-4 w-4 text-blue-400" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSocialAuth('instagram')}
            >
              <Instagram className="h-4 w-4 text-pink-600" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Separator />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            OR
          </div>
        </div>

        {/* Phone Authentication */}
        <Button 
          variant="outline" 
          className="w-full h-12 font-medium"
          onClick={handlePhoneAuth}
        >
          <Phone className="mr-3 h-5 w-5" />
          Continue with Phone Number
        </Button>

        <div className="relative">
          <Separator />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            OR
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Location Access</Label>
                <div className="space-y-2">
                  {[
                    { value: 'permanent', label: 'Allow permanent access' },
                    { value: 'app-only', label: 'Only when using this app' },
                    { value: 'denied', label: 'Deny location access' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="locationAccess"
                        value={option.value}
                        checked={formData.locationAccess === option.value}
                        onChange={(e) => setFormData({...formData, locationAccess: e.target.value as any})}
                        className="text-primary"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="w-full bg-gradient-ocean hover:opacity-90">
            <Mail className="mr-2 h-4 w-4" />
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-primary hover:underline"
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthCard;